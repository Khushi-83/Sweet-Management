const express = require("express");
const router = express.Router();

const sweetController = require("../controllers/sweet.controller");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

router.post("/", auth, admin, sweetController.createSweet);
router.get("/", auth, sweetController.getAllSweets);
router.get("/search", auth, sweetController.searchSweets);
router.put("/:id", auth, admin, sweetController.updateSweet);
router.delete("/:id", auth, admin, sweetController.deleteSweet);

router.post("/:id/purchase", auth, sweetController.purchaseSweet);
router.post("/:id/restock", auth, admin, sweetController.restockSweet);

module.exports = router;
