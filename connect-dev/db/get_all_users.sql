SELECT * FROM users WHERE users.user_id = $1;

-- SELECT * FROM users JOIN posts ON users.user_id = posts.post_id WHERE users.user_id = $1;
--  INNER JOIN posts ON users.user_id = posts.post_id;