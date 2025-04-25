from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import declarative_base, Mapped, mapped_column

Base = declarative_base()


class DBMovie(Base):
    __tablename__ = "movie"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String, nullable=False)
    director: Mapped[str] = mapped_column(String, nullable=False)
    year: Mapped[int] = mapped_column(Integer, nullable=False)


class DBReview(Base):
    # TODO: implement this class
    # - make sure DBReview inherits from Base!!!!
    # - look in data/movies.sql to see what fields a review has
    __tablename__ = "review"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    movie_id: Mapped[int] = mapped_column(Integer)
    reviewer_name: Mapped[str] = mapped_column(String)
    review_text: Mapped[str] = mapped_column(String)
    rating: Mapped[int] = mapped_column(Integer)
