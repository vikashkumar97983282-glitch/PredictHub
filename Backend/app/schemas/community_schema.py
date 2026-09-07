from typing import Literal

from pydantic import BaseModel, Field


class CommunityPostCreate(BaseModel):
    type: Literal["prediction", "discussion", "question"]
    title: str = Field(min_length=3, max_length=160)
    description: str = Field(min_length=3, max_length=5000)
    tags: list[str] = Field(default_factory=list, max_length=10)
    model: str | None = Field(default=None, max_length=100)
    prediction_type: str | None = Field(default=None, max_length=100)
    result: str | None = Field(default=None, max_length=300)
    inputs: list[list[str]] = Field(default_factory=list, max_length=30)
    category: str | None = Field(default=None, max_length=100)


class CommunityCommentCreate(BaseModel):
    content: str = Field(min_length=1, max_length=2000)
