const express = require("express");
const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
} = require("../controllers/cartController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.post("/remove", protect, removeFromCart);
router.put("/update", protect, updateCartQuantity);
router.delete("/clear", protect, clearCart);

module.exports = router;
