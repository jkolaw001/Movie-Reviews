from pydantic import BaseModel


class MovieCreate(BaseModel):
    title: str
    director: str
    year: int


class MovieOut(MovieCreate):
    id: int


class ReviewCreate(BaseModel):
    reviewer_name: str
    review_text: str
    rating: int


class ReviewOut(ReviewCreate):
    id: int
    movie_id: int
