DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS movie;

CREATE TABLE movie (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    director VARCHAR(255),
    year int
);

CREATE TABLE review (
    id SERIAL PRIMARY KEY,
    movie_id int REFERENCES movie(id),
    reviewer_name VARCHAR(255),
    review_text TEXT,
    rating int
);

INSERT INTO movie (title, director, year)
VALUES
    ('Two Mules for Sister Sara', 'Don Siegel', 1970),
    ('High Plains Drifter', 'Clint Eastwood', 1973),
    ('The Outlaw Josey Wales', 'Clint Eastwood', 1976),
    ('Unforgiven', 'Clint Eastwood', 1992);

INSERT INTO review (movie_id, reviewer_name, review_text, rating)
VALUES
    (1, 'Jan', 'Stunning, a masterpiece!', 5),
    (1, 'Raul', 'Breathtaking work by MacLaine', 5),
    (1, 'Dale', 'Possibly the greatest cowboy movie ever', 5),
    (2, 'Rhonda', 'What th? Im not sure what I just watched' , 1),
    (2, 'Dale', 'Oh my God, the best, ever!', 5),
    (3, 'Jan', 'I just love Clint for this film', 5),
    (3, 'Dale', 'They just keep getting better', 5),
    (3, 'Rhonda', 'That was pretty long...', 3),
    (4, 'Jr.', 'Wow this Eastwood guy is great!', 5),
    (4, 'Dale', 'OMG, he cant top this one', 5);

