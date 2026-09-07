from datetime import datetime, timezone

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pymongo import ReturnDocument

from app.core.jwt_services import get_current_user, get_optional_current_user
from app.database.db_connection import db
from app.schemas.community_schema import CommunityCommentCreate, CommunityPostCreate


router = APIRouter()


def object_id_or_404(value: str) -> ObjectId:
    if not ObjectId.is_valid(value):
        raise HTTPException(status_code=404, detail="Community post not found.")
    return ObjectId(value)


def user_summary(user: dict) -> dict:
    name = str(user.get("name") or user.get("full_name") or "PredictHub User").strip()
    initials = "".join(part[0] for part in name.split()[:2]).upper() or "PU"
    return {"id": str(user["_id"]), "name": name, "initials": initials}


def serialize_post(post: dict, reactions: dict[str, set[str]] | None = None) -> dict:
    post_id = str(post["_id"])
    reactions = reactions or {}
    return {
        "id": post_id,
        "type": post["type"],
        "user": post["author_name"],
        "initials": post["author_initials"],
        "author_id": post["author_id"],
        "created_at": post["created_at"].isoformat(),
        "title": post["title"],
        "description": post["description"],
        "model": post.get("model"),
        "predictionType": post.get("prediction_type"),
        "result": post.get("result"),
        "inputs": post.get("inputs", []),
        "category": post.get("category"),
        "tags": post.get("tags", []),
        "likes": post.get("likes", 0),
        "comments": post.get("comments", 0),
        "shares": post.get("shares", 0),
        "answers": post.get("answers", 0),
        "accepted": post.get("accepted", False),
        "liked": post_id in reactions.get("likes", set()),
        "bookmarked": post_id in reactions.get("bookmarks", set()),
    }


async def viewer_reactions(posts: list[dict], user: dict | None) -> dict[str, set[str]]:
    if not user or not posts:
        return {"likes": set(), "bookmarks": set()}
    rows = await db.community_reactions.find(
        {"user_id": str(user["_id"]), "post_id": {"$in": [post["_id"] for post in posts]}}
    ).to_list(length=len(posts) * 2)
    return {
        "likes": {str(row["post_id"]) for row in rows if row["type"] == "like"},
        "bookmarks": {str(row["post_id"]) for row in rows if row["type"] == "bookmark"},
    }


@router.get("/posts")
async def list_posts(
    post_type: str | None = Query(default=None, alias="type"),
    search: str | None = Query(default=None, max_length=100),
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=20, ge=1, le=50),
    user=Depends(get_optional_current_user),
):
    query = {}
    if post_type in {"prediction", "discussion", "question"}:
        query["type"] = post_type
    if search and search.strip():
        term = search.strip()
        query["$or"] = [
            {"title": {"$regex": term, "$options": "i"}},
            {"description": {"$regex": term, "$options": "i"}},
            {"tags": {"$regex": term, "$options": "i"}},
            {"model": {"$regex": term, "$options": "i"}},
        ]

    total = await db.community_posts.count_documents(query)
    posts = await db.community_posts.find(query).sort("created_at", -1).skip((page - 1) * limit).limit(limit).to_list(length=limit)
    reactions = await viewer_reactions(posts, user)
    return {"data": [serialize_post(post, reactions) for post in posts], "page": page, "limit": limit, "total": total}


@router.post("/posts", status_code=status.HTTP_201_CREATED)
async def create_post(data: CommunityPostCreate, user=Depends(get_current_user)):
    author = user_summary(user)
    post = {
        "type": data.type,
        "title": data.title.strip(),
        "description": data.description.strip(),
        "tags": [tag.strip() for tag in data.tags if tag.strip()],
        "model": data.model.strip() if data.model else None,
        "prediction_type": data.prediction_type.strip() if data.prediction_type else None,
        "result": data.result.strip() if data.result else None,
        "inputs": data.inputs,
        "category": data.category.strip() if data.category else None,
        "author_id": author["id"],
        "author_name": author["name"],
        "author_initials": author["initials"],
        "likes": 0,
        "comments": 0,
        "shares": 0,
        "answers": 0,
        "accepted": False,
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc),
    }
    result = await db.community_posts.insert_one(post)
    post["_id"] = result.inserted_id
    return {"message": "Community post created successfully.", "data": serialize_post(post)}


@router.get("/posts/{post_id}/comments")
async def list_comments(post_id: str):
    post_object_id = object_id_or_404(post_id)
    if not await db.community_posts.find_one({"_id": post_object_id}, {"_id": 1}):
        raise HTTPException(status_code=404, detail="Community post not found.")
    comments = await db.community_comments.find({"post_id": post_object_id}).sort("created_at", 1).to_list(length=200)
    return {"data": [{"id": str(comment["_id"]), "content": comment["content"], "user": comment["author_name"], "initials": comment["author_initials"], "author_id": comment["author_id"], "created_at": comment["created_at"].isoformat()} for comment in comments]}


@router.post("/posts/{post_id}/comments", status_code=status.HTTP_201_CREATED)
async def create_comment(post_id: str, data: CommunityCommentCreate, user=Depends(get_current_user)):
    post_object_id = object_id_or_404(post_id)
    if not await db.community_posts.find_one({"_id": post_object_id}, {"_id": 1}):
        raise HTTPException(status_code=404, detail="Community post not found.")
    author = user_summary(user)
    comment = {"post_id": post_object_id, "content": data.content.strip(), "author_id": author["id"], "author_name": author["name"], "author_initials": author["initials"], "created_at": datetime.now(timezone.utc)}
    result = await db.community_comments.insert_one(comment)
    await db.community_posts.update_one({"_id": post_object_id}, {"$inc": {"comments": 1}})
    return {"message": "Comment added successfully.", "data": {"id": str(result.inserted_id), "content": comment["content"], "user": author["name"], "initials": author["initials"], "created_at": comment["created_at"].isoformat()}}


@router.post("/posts/{post_id}/like")
async def toggle_like(post_id: str, user=Depends(get_current_user)):
    post_object_id = object_id_or_404(post_id)
    if not await db.community_posts.find_one({"_id": post_object_id}, {"_id": 1}):
        raise HTTPException(status_code=404, detail="Community post not found.")
    query = {"post_id": post_object_id, "user_id": str(user["_id"]), "type": "like"}
    existing = await db.community_reactions.find_one(query)
    if existing:
        await db.community_reactions.delete_one({"_id": existing["_id"]})
        await db.community_posts.update_one({"_id": post_object_id, "likes": {"$gt": 0}}, {"$inc": {"likes": -1}})
        liked = False
    else:
        await db.community_reactions.insert_one(query)
        await db.community_posts.update_one({"_id": post_object_id}, {"$inc": {"likes": 1}})
        liked = True
    post = await db.community_posts.find_one({"_id": post_object_id}, {"likes": 1})
    return {"liked": liked, "likes": post.get("likes", 0)}


@router.post("/posts/{post_id}/bookmark")
async def toggle_bookmark(post_id: str, user=Depends(get_current_user)):
    post_object_id = object_id_or_404(post_id)
    if not await db.community_posts.find_one({"_id": post_object_id}, {"_id": 1}):
        raise HTTPException(status_code=404, detail="Community post not found.")
    query = {"post_id": post_object_id, "user_id": str(user["_id"]), "type": "bookmark"}
    existing = await db.community_reactions.find_one(query)
    if existing:
        await db.community_reactions.delete_one({"_id": existing["_id"]})
        bookmarked = False
    else:
        await db.community_reactions.insert_one(query)
        bookmarked = True
    return {"bookmarked": bookmarked}


@router.post("/posts/{post_id}/share")
async def record_share(post_id: str):
    post_object_id = object_id_or_404(post_id)
    result = await db.community_posts.find_one_and_update(
        {"_id": post_object_id},
        {"$inc": {"shares": 1}},
        projection={"shares": 1},
        return_document=ReturnDocument.AFTER,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Community post not found.")
    return {"shares": result.get("shares", 0)}


@router.get("/insights")
async def community_insights():
    """Return lightweight sidebar data without exposing user email addresses."""
    topics = await db.community_posts.aggregate([
        {"$unwind": "$tags"},
        {"$group": {"_id": "$tags", "discussions": {"$sum": 1}}},
        {"$sort": {"discussions": -1, "_id": 1}},
        {"$limit": 5},
    ]).to_list(length=5)
    models = await db.community_posts.aggregate([
        {"$match": {"model": {"$type": "string", "$ne": ""}}},
        {"$group": {"_id": "$model", "discussions": {"$sum": 1}}},
        {"$sort": {"discussions": -1, "_id": 1}},
        {"$limit": 5},
    ]).to_list(length=5)
    contributors = await db.community_posts.aggregate([
        {"$group": {"_id": {"id": "$author_id", "name": "$author_name", "initials": "$author_initials"}, "points": {"$sum": 1}, "answers": {"$sum": "$answers"}}},
        {"$sort": {"points": -1, "_id.name": 1}},
        {"$limit": 5},
    ]).to_list(length=5)
    return {
        "trending_topics": [{"name": item["_id"], "discussions": item["discussions"]} for item in topics],
        "popular_models": [{"name": item["_id"], "discussions": item["discussions"]} for item in models],
        "contributors": [{"rank": index + 1, "name": item["_id"]["name"], "initials": item["_id"]["initials"], "points": item["points"], "answers": item["answers"]} for index, item in enumerate(contributors)],
    }


@router.delete("/posts/{post_id}")
async def delete_post(post_id: str, user=Depends(get_current_user)):
    post_object_id = object_id_or_404(post_id)
    post = await db.community_posts.find_one({"_id": post_object_id})
    if not post:
        raise HTTPException(status_code=404, detail="Community post not found.")
    if post["author_id"] != str(user["_id"]):
        raise HTTPException(status_code=403, detail="You can only delete your own community posts.")
    await db.community_posts.delete_one({"_id": post_object_id})
    await db.community_comments.delete_many({"post_id": post_object_id})
    await db.community_reactions.delete_many({"post_id": post_object_id})
    return {"message": "Community post deleted successfully."}
