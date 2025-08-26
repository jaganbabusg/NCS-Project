const express = require('express');
const router = express.Router();
const employeeService = require('../services/employeesServices');
//Get all employees or employees by cafe
router.get('/', async (req, res) => {
  const data = await employeeService.getEmployees(req.query.cafe);
  res.json(data);
});
//Get employee by id
router.get('/:id', async (req, res) => {
  const data = await employeeService.getEmployee(req.params.id);
  res.status(200).json(data);
});
//Add new employee
router.post('/', async (req, res) => {
  await employeeService.addEmployee(req.body);
  res.sendStatus(201);
});
//Update existing employee
router.put('/', async (req, res) => {
  await employeeService.updateEmployee(req.body);
  res.sendStatus(200);
});
//Delete employee by id
router.delete('/:id', async (req, res) => {
  await employeeService.deleteEmployee(req.params.id);
  res.sendStatus(200);
});
//Export the router
module.exports = router;
