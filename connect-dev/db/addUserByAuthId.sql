INSERT INTO users (first_name, auth_id) VALUES ($1, $2);
SELECT * FROM users WHERE auth_id = $2;