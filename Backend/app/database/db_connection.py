import os

from dotenv import load_dotenv
from pymongo import AsyncMongoClient


load_dotenv()


MONGODB_URI = os.getenv("MONGODB_URI")
MONGODB_DATABASE = os.getenv("MONGODB_DATABASE")


if not MONGODB_URI:
    raise ValueError(
        "MONGODB_URI environment variable is not set."
    )

if not MONGODB_DATABASE:
    raise ValueError(
        "MONGODB_DATABASE environment variable is not set."
    )


client = None
db = None


async def connect_to_database():

    global client, db

    client = AsyncMongoClient(MONGODB_URI)

    db = client[MONGODB_DATABASE]

    # Test connection
    await client.admin.command("ping")

    print("🚀🚀 MongoDB Atlas connected successfully")


async def close_database_connection():

    global client

    if client:
        await client.close()

        print("MongoDB connection closed")


def get_database():

    if db is None:
        raise RuntimeError(
            "Database is not connected."
        )

    return db