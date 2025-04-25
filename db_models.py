from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class DBMovie(Base):
    __tablename__ = "movie"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    director = Column(String, nullable=False)
    year = Column(Integer, nullable=False)


class DBReview():
    # TODO: implement this class
    # - make sure DBReview inherits from Base!!!!
    # - look in data/movies.sql to see what fields a review has
    pass
