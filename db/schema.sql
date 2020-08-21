DROP DATABASE IF EXISTS burgers_db;

CREATE DATABASE burgers_db;

USE burgers_db

DROP TABLE IF EXISTS burgers;
-- Note BOOL is actually stored as TINYINT(1)
CREATE TABLE burgers (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(30) NOT NULL,
  devoured BOOL DEFAULT false
);

