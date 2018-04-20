INSERT INTO connections (connector_id, user_id) VALUES ($1, $2);

-- SELECT COUNT(*) FROM connections WHERE user_id = $2;