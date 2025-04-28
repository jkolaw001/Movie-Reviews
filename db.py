from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db_models import DBMovie, DBReview
from schemas import MovieCreate, MovieOut, ReviewCreate, ReviewOut

DATABASE_URL = "postgresql+psycopg://postgres:postgres@localhost:5432/movies"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
db = SessionLocal()


def get_movies() -> list[MovieOut]:
    db = SessionLocal()
    # TODO: update the line below get all of the movies out of the database
    db_movies = db.query(DBMovie).all()

    movies = []
    for db_movie in db_movies:
        movies.append(
            MovieOut(
                id=db_movie.id,
                title=db_movie.title,
                director=db_movie.director,
                year=db_movie.year,
            )
        )
    db.close()
    return movies


def get_movie(movie_id: int) -> MovieOut | None:
    db = SessionLocal()
    db_movie = db.query(DBMovie).filter(DBMovie.id == movie_id).first()

    # TODO: implement the rest of this function
    # 1) Turn the DBMovie into a MovieOut
    # 2) Return it
    movie = None
    if db_movie:
        movie = MovieOut(
            id=db_movie.id,
            title=db_movie.title,
            director=db_movie.director,
            year=db_movie.year,
        )
    db.close()
    return movie


def create_movie(movie: MovieCreate) -> MovieOut:
    db = SessionLocal()
    db_movie = DBMovie(**movie.model_dump())
    db.add(db_movie)
    db.commit()
    db.refresh(db_movie)
    movie = MovieOut(
        id=db_movie.id,
        title=db_movie.title,
        director=db_movie.director,
        year=db_movie.year,
    )
    db.close()
    return movie


def create_review(movie_id: int, review: ReviewCreate) -> ReviewOut:
    # TODO: implement this function
    # 1) Create a db model object
    # 2) Add it to the database
    # 3) Refresh the db model and then return it as a ReviewOut
    db = SessionLocal()

    db_object = db.query(DBMovie).filter(DBMovie.id == movie_id).first()

    if not db_object:
        db.close()
        raise ValueError

    db_review = DBReview(**review.model_dump(), movie_id=movie_id)
    db.add(db_review)
    db.commit()
    db.refresh(db_review)

    review = ReviewOut(
        id=db_review.id,
        movie_id=db_object.id,
        reviewer_name=db_review.reviewer_name,
        review_text=db_review.review_text,
        rating=db_review.rating,
    )
    db.close()
    return review


def get_reviews(movie_id: int) -> list[ReviewOut]:
    db = SessionLocal()
    db_reviews = db.query(DBReview).filter(DBReview.movie_id == movie_id).all()

    reviews = [
        ReviewOut(
            id=db_review.id,
            movie_id=db_review.movie_id,
            reviewer_name=db_review.reviewer_name,
            review_text=db_review.review_text,
            rating=db_review.rating,
        )
        for db_review in db_reviews
    ]
    db.close()
    return reviews
