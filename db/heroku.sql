-- Heroku uses custom database name and needs createdAt timestamp
USE cio3kowo84uku7s9

DROP TABLE IF EXISTS burgers;
-- Note BOOL is actually stored as TINYINT(1)
CREATE TABLE burgers (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(30) NOT NULL,
  devoured BOOL DEFAULT false,
  createdAt TIMESTAMP NOT NULL
);

INSERT INTO burgers (description) VALUES
('Double burger'),
('Cheese burger'),
('Vegetable burger');
