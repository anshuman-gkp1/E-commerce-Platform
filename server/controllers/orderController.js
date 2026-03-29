const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = new Order({
      user: req.user.id,
      products: cart.items,
      shippingAddress,
      totalAmount: cart.totalPrice,
    });

    await order.save();

    // Clear the cart
    await Cart.findOneAndUpdate(
      { user: req.user.id },
      { items: [], totalPrice: 0 },
    );

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("products.product")
      .populate("user");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if user owns this order
    if (
      order.user._id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this order" });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate(
      "products.product",
    );

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products.product");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status (admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, paymentStatus },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
