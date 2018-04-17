CREATE TABLE users
(user_id SERIAL PRIMARY KEY, auth_id TEXT, email VARCHAR(100), first_name VARCHAR(100), user_type INTEGER, birthdate VARCHAR(100), bio VARCHAR(500), experience INTEGER, profile_picture TEXT);

CREATE TABLE posts (post_id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(user_id), post_body VARCHAR(300), post_date VARCHAR(100));