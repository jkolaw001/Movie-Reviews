from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pathlib import Path
from schemas import MovieCreate, MovieOut, ReviewCreate, ReviewOut
from db import db, get_movie, get_movies, get_reviews, create_movie
from typing import List

app = FastAPI()


@app.get("/api/movies")
async def endpoint_get_movies() -> list[MovieOut]:
    return get_movies()


@app.get("/api/movies/{movie_id}")
async def endpoint_get_movie(movie_id: int) -> MovieOut:
    movie = get_movie(movie_id)
    if not movie:
        raise HTTPException(status_code=404, detail="Item not found")
    return movie


@app.post("/api/movies")
async def endpoint_create_movie(movie: MovieCreate) -> MovieOut:
    movie = create_movie(movie)
    return movie


@app.post("/api/movies/{movie_id}/reviews")
async def create_review(movie_id: int, review: ReviewCreate) -> ReviewOut:
    review = db.create_review(movie_id, review)
    return review


@app.get("/api/movies/{movie_id}/reviews")
async def get_reviews(movie_id: int) -> list[ReviewOut]:
    return db.get_reviews(movie_id)


# Route to handle requests for static assets
# this is a catch all so it should be registered last
@app.get("/{file_path}", response_class=FileResponse)
def get_static_file(file_path: str):
    if Path("static/" + file_path).is_file():
        return "static/" + file_path
    raise HTTPException(status_code=404, detail="Item not found")
