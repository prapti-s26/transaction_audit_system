CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  balance NUMERIC DEFAULT 1000
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  sender_id INT,
  receiver_id INT,
  amount NUMERIC,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20)
);

-- Sender (logged-in user)
INSERT INTO users (id, name, email, balance)
VALUES (1, 'Test User', 'test@gmail.com', 1000);

-- Receiver
INSERT INTO users (id, name, email, balance)
VALUES (2, 'Receiver User', 'receiver@gmail.com', 500);

ALTER TABLE users
ADD COLUMN password VARCHAR(255);

UPDATE users
SET password = 'Test@123'
WHERE id = 1;

select * from transactions
select * from users