const sweetService = require("../services/sweet.service");

const createSweet = async (req, res) => {
  try {
    const sweet = await sweetService.createSweet(req.body);
    res.status(201).json(sweet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllSweets = async (req, res) => {
  try {
    const sweets = await sweetService.getAllSweets();
    res.status(200).json(sweets);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const searchSweets = async (req, res) => {
  try {
    const sweets = await sweetService.searchSweets(req.query);
    res.status(200).json(sweets);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateSweet = async (req, res) => {
  try {
    const sweet = await sweetService.updateSweet(req.params.id, req.body);
    res.status(200).json(sweet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteSweet = async (req, res) => {
  try {
    await sweetService.deleteSweet(req.params.id);
    res.status(200).json({ message: "Sweet deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const purchaseSweet = async (req, res) => {
  try {
    const sweet = await sweetService.purchaseSweet(req.params.id);
    res.status(200).json(sweet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const restockSweet = async (req, res) => {
  try {
    const sweet = await sweetService.restockSweet(req.params.id, req.body);
    res.status(200).json(sweet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
};