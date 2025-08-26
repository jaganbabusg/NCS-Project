-- dbCafesEmployees (Database)
DROP DATABASE IF EXISTS dbCafesEmployees;
CREATE DATABASE dbCafesEmployees;
USE dbCafesEmployees;
-- Cafes (Table)
CREATE TABLE tbCafes (
  id CHAR(36) PRIMARY KEY, -- UUID
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  logo VARCHAR(255) DEFAULT NULL,
  location VARCHAR(100) NOT NULL
);
-- Employees (Table)
CREATE TABLE tbEmployees (
  id VARCHAR(9) PRIMARY KEY,  -- UIXXXXXXX
  name VARCHAR(100) NOT NULL,
  email_address VARCHAR(100) UNIQUE NOT NULL,
  phone_number VARCHAR(8) UNIQUE NOT NULL,
  gender VARCHAR(10) NOT NULL,
  cafe_id CHAR(36) NOT NULL,
  start_date DATE NOT NULL,
  FOREIGN KEY (cafe_id) REFERENCES tbCafes(id)
);
