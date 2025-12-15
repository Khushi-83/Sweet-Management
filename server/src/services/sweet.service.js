const Sweet = require("../models/sweet");

const createSweet = async (data) => {
  return Sweet.create(data);
};

module.exports = { createSweet };
