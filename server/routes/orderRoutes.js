const express = require("express");
const {
  createOrder,
  getOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/user", protect, getUserOrders);
router.get("/all", protect, authorize("admin"), getAllOrders);
router.get("/:id", protect, getOrder);
router.put("/:id", protect, authorize("admin"), updateOrderStatus);

module.exports = router;
