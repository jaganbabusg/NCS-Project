const express = require('express');
const router = express.Router();
const cafeService = require('../services/cafesServices');
//Get all cafes or cafes by location
router.get('/', async (req, res) => {
  const data = await cafeService.getCafes(req.query.location);
  res.status(200).json(data);
});
//Get cafe by id
router.get('/:id', async (req, res) => {
  const data = await cafeService.getCafe(req.params.id);
  res.status(200).json(data);
});
//Add new cafe
router.post('/', async (req, res) => {
  await cafeService.addCafe(req.body);
  res.sendStatus(201);
});
//Update existing cafe
router.put('/', async (req, res) => {
  await cafeService.updateCafe(req.body);
  res.sendStatus(200);
});
//Delete cafe by id
router.delete('/:id', async (req, res) => {
  await cafeService.deleteCafe(req.params.id);
  res.sendStatus(200);
});
//Export the router
module.exports = router;
