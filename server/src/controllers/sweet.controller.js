const sweetService = require("../services/sweet.service");

const purchaseSweet = async (req, res) => {
  try {
    const sweet = await sweetService.purchaseSweet(req.params.id);
    res.status(200).json(sweet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  purchaseSweet,
};
