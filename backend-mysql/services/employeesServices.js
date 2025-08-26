const pool = require('../db');
//query to get all employees, optionally filtered by cafe name, including days worked
async function getEmployees(cafe) {
  let query = `SELECT e.*, c.name AS cafe, DATEDIFF(CURDATE(), e.start_date) AS days_worked FROM tbEmployees e LEFT JOIN tbCafes c ON e.cafe_id = c.id`;
  let params = [];
  if (cafe) {
    query += " WHERE c.name = ?";
    params.push(cafe);
  }
  query += " ORDER BY days_worked DESC";
  const [rows] = await pool.query(query, params);
  return rows;
}
//query to get a single employee by id
async function getEmployee(id) {
  const [rows] = await pool.query("SELECT * FROM tbEmployees WHERE id=?", [id]);
  return rows[0];
}
//Insert a new employee with custom ID generation
async function addEmployee(emp) {
  emp.id = generateCustomId();
  await pool.query("INSERT INTO tbEmployees VALUES (?, ?, ?, ?, ?, ?, ?)", [emp.id, emp.name, emp.email_address, emp.phone_number, emp.gender, emp.cafe_id, emp.start_date]);
}
//Update an existing employee
async function updateEmployee(emp) {
  await pool.query("UPDATE tbEmployees SET name=?, email_address=?, phone_number=?, gender=?, cafe_id=?, start_date=? WHERE id=?", [emp.name, emp.email_address, emp.phone_number, emp.gender, emp.cafe_id, emp.start_date, emp.id]);
}
//Delete an employee by id
async function deleteEmployee(id) {
  await pool.query("DELETE FROM tbEmployees WHERE id=?", [id]);
}
//Custom ID generation function
function generateCustomId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomPart = '';
  for (let i = 0; i < 7; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return 'UI' + randomPart;
}
//export the functions
module.exports = { getEmployees, getEmployee, addEmployee, updateEmployee, deleteEmployee };
