const sweetService = require("../services/sweet.service");

const createSweet = async (req, res) => {
  const sweet = await sweetService.createSweet(req.body);
  res.status(201).json(sweet);
};

module.exports = { createSweet };
