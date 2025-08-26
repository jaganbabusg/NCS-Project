-- Seed data for Cafes and Employees
-- Clear existing data
USE dbCafesEmployees;
delete from tbEmployeeCafe;
delete from tbEmployees;
delete from tbCafes;
-- Cafes (table)
INSERT INTO tbCafes (id, name, description, logo, location)
VALUES
  (UUID(), "Cafe Mocha", "Cozy cafe with mocha specials", "./images/image01.jpg", "Woodlands"),
  (UUID(), "Latte Lounge", "Modern cafe serving lattes", "./images/image02.jpg", "Tiong Bahru"),
  (UUID(), "Espresso Express", "Quick stop for espresso", "./images/image03.jpg", "Orchard");
-- Employees (table)
INSERT INTO tbEmployees (id, name, email_address, phone_number, gender, cafe_id, start_date)
VALUES
  ("UI00000A1", "Lily Goh", "lily@example.com", "81818181", "Female", (SELECT id FROM tbCafes WHERE name="Cafe Mocha" LIMIT 1), "2024-01-01"),
  ("UI00000B2", "MK Gautam", "gautam@example.com", "82828282", "Male", (SELECT id FROM tbCafes WHERE name="Latte Lounge" LIMIT 1), "2023-12-01"),
  ("UI00000C3", "Jagan Babu", "jagan@example.com", "92929292", "Male", (SELECT id FROM tbCafes WHERE name="Cafe Mocha" LIMIT 1), "2022-11-01"),
  ("UI00000D4", "Akira Wada", "wada@example.com", "95959595", "Male", (SELECT id FROM tbCafes WHERE name="Latte Lounge" LIMIT 1), "2021-10-01"),
  ("UI00000E5", "Samantha", "samantha@example.com", "88776655", "Female", (SELECT id FROM tbCafes WHERE name="Cafe Mocha" LIMIT 1), "2023-02-01"),
  ("UI00000F6", "Nguyen Nhan", "nguyen@example.com", "87878787", "Male", (SELECT id FROM tbCafes WHERE name="Latte Lounge" LIMIT 1), "2024-12-01"),
  ("UI00000G7", "Chia Ching", "chia@example.com", "99009900", "Male", (SELECT id FROM tbCafes WHERE name="Espresso Express" LIMIT 1), "2025-01-15");
