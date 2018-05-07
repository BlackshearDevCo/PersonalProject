// CREATE TABLE users
// (user_id SERIAL PRIMARY KEY, auth_id TEXT, email VARCHAR(100), first_name VARCHAR(100), user_type INTEGER, birthdate VARCHAR(100), bio VARCHAR(500), experience INTEGER, profile_picture TEXT);

// CREATE TABLE posts (post_id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(user_id), post_body VARCHAR(300), post_date VARCHAR(100));


// -- CREATE TABLE users
// -- (user_id SERIAL PRIMARY KEY, auth_id TEXT, email VARCHAR(100), first_name VARCHAR(100), last_name VARCHAR(100), user_type INTEGER, birthdate VARCHAR(100), bio VARCHAR(500), experience VARCHAR(50), profile_picture TEXT);

// -- INSERT INTO users (email,first_name,last_name,user_type,birthdate,experience)
// -- VALUES ('Test','Aaron','Blackshear',1,06-29-1999,'Senior Dev');

// -- SELECT * FROM users;
// -- CREATE TABLE posts (post_id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(user_id), post_body VARCHAR(300), post_date VARCHAR(100));

// -- ALTER TABLE users ADD COLUMN location VARCHAR(200);
// -- DELETE FROM users WHERE user_id = 8;

// -- SELECT * FROM users WHERE user_id = 9;

// -- SELECT * FROM posts INNER JOIN users ON users.user_id = posts.user_id ORDER BY posts.post_id DESC LIMIT 10;




// -- INSERT INTO posts (user_id, post_body) VALUES (8, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla libero dui, elementum quis lectus id, feugiat lacinia augue. Cras tristique convallis suscipit. Curabitur hendrerit, purus ac facilisis congue, magna est finibus leo, at pulvinar lorem diam convallis massa.');

// -- SELECT * FROM posts INNER JOIN users ON users.user_id = posts.user_id;

// -- SELECT * FROM users JOIN posts ON users.user_id = posts.post_id WHERE users.user_id = 8;

// -- DROP TABLE users;

// -- CREATE TABLE posts (post_id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(user_id), post_body VARCHAR(300),
// -- post_date VARCHAR(100));

// -- UPDATE users SET user_type = null WHERE user_id = 8;

// -- UPDATE users SET company_name = null WHERE user_id = 8;

// -- ALTER TABLE users ADD company_name VARCHAR(100);

// -- SELECT * FROM posts INNER JOIN users ON users.user_id = posts.user_id WHERE users.user_id = 8 ORDER BY posts.post_id DESC LIMIT 150;

// -- INSERT INTO posts ADD post_type integer REFERENCES users(user_type)

// -- SELECT * FROM posts INNER JOIN users ON users.user_id = posts.user_id WHERE users.user_type = 2 ORDER BY posts.post_id DESC LIMIT 150;

// -- SELECT * FROM posts INNER JOIN users ON users.user_id = posts.user_id WHERE users.user_id = 8 ORDER BY posts.post_id DESC LIMIT 150;
// -- SELECT * FROM users WHERE user_id = 8;

// -- CREATE TABLE connections (connection_id SERIAL PRIMARY KEY, connector_id INTEGER REFERENCES users(user_id), user_id INTEGER REFERENCES users(user_id));

// -- INSERT INTO connections (connector_id, user_id) VALUES (9,8);

// -- SELECT COUNT(*) FROM connections WHERE user_id = 11;
// -- SELECT COUNT(connector_id) FROM connections WHERE user_id = 8;

// -- ALTER TABLE users ADD portfolio TEXT;
// -- ALTER TABLE users DROP notifications;

// -- UPDATE users SET notifications = notifications+1 WHERE user_id = 8 RETURNING notifications;

// -- SELECT notifications FROM users WHERE user_id = 8;

// -- SELECT DISTINCT connector_id FROM connections WHERE user_id = 12;
// -- DELETE FROM connections WHERE connector_id = 9;
// -- UPDATE users SET user_type = NULL WHERE user_id = 9;
// -- UPDATE users SET location = NULL WHERE user_id = 9;
// -- UPDATE users SET bio = NULL WHERE user_id = 9;
// -- UPDATE users SET experience = NULL WHERE user_id = 9;
// -- UPDATE users SET birthdate = NULL WHERE user_id = 9;
