INSERT INTO users (first_name, auth_id, profile_picture, email) VALUES ($1, $2, $3, $4);
SELECT * FROM users WHERE auth_id = $2;