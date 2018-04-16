SELECT * FROM users WHERE user_id = $1;

--  INNER JOIN posts ON users.user_id = posts.post_id;