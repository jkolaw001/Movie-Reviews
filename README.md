# Movie Reviews App

A simple web application for browsing movies and adding reviews, built with FastAPI, SQLAlchemy, PostgreSQL, and a vanilla JS frontend.

![image](https://github.com/user-attachments/assets/06525ee9-2a08-4a54-a2d1-22acf8860abc)
![image](https://github.com/user-attachments/assets/39761735-78af-4308-995e-24362a155e11)

---

## Features

-   Browse a list of movies
-   View movie details and reviews
-   Add new movies
-   Add reviews to movies

---

## Setup Instructions

### 1. Database (PostgreSQL)

This project uses Docker to run a PostgreSQL database.
To start the database server, run:

```bash
docker compose up -d
```

**Optional:**
To ensure a clean environment, you can stop and remove all containers and artifacts before starting:

```bash
# Stop all running containers
docker kill $(docker ps -q)

# Remove all stopped containers and unused data
docker system prune -af
```

To connect to the database shell:

```bash
docker exec -it postgres_db psql -U postgres
```

---

### 2. Backend (FastAPI)

**Requirements:**

-   Python 3.10+
-   [fastapi[standard]](https://fastapi.tiangolo.com/)
-   [psycopg](https://www.psycopg.org/)
-   [sqlalchemy](https://www.sqlalchemy.org/)

**Install dependencies:**

```bash
pip install "fastapi[standard]" psycopg sqlalchemy
```

**Run the FastAPI server:**

```bash
fastapi dev main.py
```

The API will be available at [http://localhost:8000](http://localhost:8000).

---

### 3. Frontend

The frontend is served as static files by FastAPI.
Open [http://localhost:8000/index.html](http://localhost:8000/index.html) in your browser.

---

## Project Structure

```
.
├── data/
│   └── movies.sql         # SQL for creating and seeding the database
├── static/                # Frontend HTML, JS, CSS
│   ├── index.html
│   ├── add-movie.html
│   ├── add-review.html
│   ├── movie-detail.html
│   ├── index.js
│   ├── add-movie.js
│   ├── add-review.js
│   ├── movie-detail.js
│   └── styles.css
├── db_models.py           # SQLAlchemy ORM models
├── db.py                  # Database access functions
├── main.py                # FastAPI app and API routes
├── schemas.py             # Pydantic schemas
└── README.md
```

---

## Database Schema

See [`data/movies.sql`](data/movies.sql) for full details.

-   **movie**:

    -   `id` (SERIAL, PK)
    -   `title` (VARCHAR)
    -   `director` (VARCHAR)
    -   `year` (int)

-   **review**:
    -   `id` (SERIAL, PK)
    -   `movie_id` (int, FK to movie)
    -   `reviewer_name` (VARCHAR)
    -   `review_text` (TEXT)
    -   `rating` (int)

---

## API Endpoints

-   `GET /api/movies` — List all movies
-   `GET /api/movies/{movie_id}` — Get details for a movie
-   `POST /api/movies` — Add a new movie
-   `GET /api/movies/{movie_id}/reviews` — List reviews for a movie
-   `POST /api/movies/{movie_id}/reviews` — Add a review to a movie

---

## Development Notes

-   The backend uses SQLAlchemy ORM for database access.
-   The frontend is pure HTML/CSS/JS, no frameworks.
-   Static files are served from the `/static` directory by FastAPI.
-   To reset and seed the database, run the SQL in [`data/movies.sql`](data/movies.sql).

---
