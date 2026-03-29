const express = require("express");
const {
  register,
  login,
  getCurrentUser,
  updateAddress,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getCurrentUser);
router.put("/address", protect, updateAddress);

module.exports = router;
