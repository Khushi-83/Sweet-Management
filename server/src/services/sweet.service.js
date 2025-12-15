const Sweet = require("../models/sweet");

const createSweet = async (data) => {
  return Sweet.create(data);
};

const purchaseSweet = async (id) => {
  const sweet = await Sweet.findById(id);

  if (!sweet) {
    throw new Error("Sweet not found");
  }

  if (sweet.quantity === 0) {
    throw new Error("Out of stock");
  }

  sweet.quantity -= 1;
  await sweet.save();

  return sweet;
};

module.exports = {
  createSweet,
  purchaseSweet,
};
