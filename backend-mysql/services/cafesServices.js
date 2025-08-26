const pool = require('../db');
const { v4: UUID } = require('uuid');
//query to get all cafes, optionally filtered by location, including employee count
async function getCafes(location) {
  let query = `SELECT c.*, COUNT(e.id) AS employees
    FROM tbCafes c LEFT JOIN tbEmployees e ON c.id = e.cafe_id`;
  let params = [];
  if (location) {
    query += " WHERE c.location = ?";
    params.push(location);
  }
  query += " GROUP BY c.id ORDER BY employees DESC";
  const [rows] = await pool.query(query, params);
  return rows;
}
//query to get a single cafe by id
async function getCafe(id) {
  const [rows] = await pool.query("SELECT * FROM tbCafes WHERE id=?", [id]);
  return rows[0];
}
//Insert a new cafe
async function addCafe({ name, description, logo, location }) {
  await pool.query("INSERT INTO tbCafes VALUES (?, ?, ?, ?, ?)", [UUID(), name, description, logo, location]);
}
//Update an existing cafe
async function updateCafe({ id, name, description, logo, location }) {
  await pool.query("UPDATE tbCafes SET name=?, description=?, logo=?, location=? WHERE id=?", [name, description, logo, location, id]);
}
//Delete a cafe by id
async function deleteCafe(id) {
  await pool.query("DELETE FROM tbCafes WHERE id=?", [id]);
}
//export the functions
module.exports = { getCafes, getCafe, addCafe, updateCafe, deleteCafe };
