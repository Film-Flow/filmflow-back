from fastapi import FastAPI, HTTPException
from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID
from pydantic import BaseModel
from datetime import datetime
from uuid import uuid4
from generate_similarity_csv import get_recommendations
import csv
import pandas as pd

app = FastAPI()
DATABASE_URL = "postgresql://filmflow:password@localhost:5432/filmflow"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class MovieBase(BaseModel):
    title: str
    release_date: datetime
    gender: str
    description: str
    image: str = None
class Movie(Base):
    __tablename__ = "Movie"

    id = Column(String, primary_key=True)
    title = Column(String)
    release_year = Column(Integer)
    gender = Column(String)
    description = Column(String)
    popularity = Column(Float)
    runtime = Column(Integer)
    image = Column(String)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

@app.get("/movies")
def add_movie():
    db = SessionLocal()
    with open('shared/movie_data.csv', 'r') as f:
        reader = csv.reader(f, delimiter=';')
        next(reader)
        for row in reader:
            popularity = float(row[7].replace(',', '.'))
            new_movie = Movie(
                id = row[0],
                gender = row[1],
                image = f"https://a.ltrbxd.com/resized/{row[2]}.jpg",
                title = row[5],
                description = row[6],
                popularity = popularity,
                runtime = row[8],
                release_year = row[9],
                created_at = datetime.now(),
                updated_at = datetime.now()
            )
            db.add(new_movie)
            db.commit()
            db.refresh(new_movie)
    db.close()
    return {"message": "Movies added successfully"}

class Movie(BaseModel):
    title: str

@app.post("/recommendations")
async def recommendation(movie: Movie):
    recommendations = get_recommendations(movie.title)
    recommendations_list = recommendations.index.to_list()
    recommendations_list.pop(0)
    return {"recommendations": recommendations_list}