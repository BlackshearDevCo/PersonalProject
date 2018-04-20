UPDATE users SET user_type = $2, birthdate = $3, bio = $4, experience = $5, location = $6, company_name = $7, portfolio = $8 WHERE user_id = $1;
-- DON'T TOUCH