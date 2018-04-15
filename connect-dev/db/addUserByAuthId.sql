INSERT INTO users (first_name, auth_id, email, profile_picture) VALUES ($1, $2, $3, $4);
SELECT * FROM users WHERE auth_id = $2;