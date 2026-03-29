const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config({ path: "./config/config.env" });

const sampleProducts = [
  {
    name: "Wireless Earbuds",
    description: "High-quality wireless earbuds with noise cancellation",
    price: 2999,
    category: "Electronics",
    image: "https://loremflickr.com/600/600/earbuds?lock=11",
    stock: 50,
  },
  {
    name: "Smart Watch",
    description: "Feature-rich smartwatch with fitness tracking",
    price: 8999,
    category: "Electronics",
    image: "https://loremflickr.com/600/600/smartwatch?lock=12",
    stock: 30,
  },
  {
    name: "Running Shoes",
    description: "Comfortable running shoes for all terrains",
    price: 3999,
    category: "Sports",
    image: "https://loremflickr.com/600/600/running-shoes?lock=13",
    stock: 40,
  },
  {
    name: "Yoga Mat",
    description: "Premium quality yoga mat for fitness enthusiasts",
    price: 1499,
    category: "Sports",
    image: "https://loremflickr.com/600/600/yoga-mat?lock=14",
    stock: 35,
  },
  {
    name: "Pillow",
    description: "Orthopedic pillow for better sleep",
    price: 1299,
    category: "Home",
    image: "https://loremflickr.com/600/600/pillow?lock=15",
    stock: 60,
  },
  {
    name: "Coffee Maker",
    description: "Automatic coffee maker with timer",
    price: 4999,
    category: "Home",
    image: "https://loremflickr.com/600/600/coffee-maker?lock=16",
    stock: 25,
  },
  {
    name: "JavaScript Book",
    description: "Learn JavaScript from scratch - Comprehensive guide",
    price: 599,
    category: "Books",
    image: "https://loremflickr.com/600/600/programming-book?lock=17",
    stock: 100,
  },
  {
    name: "Web Development Guide",
    description: "Master web development with this complete guide",
    price: 799,
    category: "Books",
    image: "https://loremflickr.com/600/600/web-development-book?lock=18",
    stock: 80,
  },
  {
    name: "Face Wash",
    description: "Gentle face wash for all skin types",
    price: 349,
    category: "Beauty",
    image: "https://loremflickr.com/600/600/face-wash?lock=19",
    stock: 120,
  },
  {
    name: "Moisturizer",
    description: "Hydrating moisturizer with natural ingredients",
    price: 699,
    category: "Beauty",
    image: "https://loremflickr.com/600/600/moisturizer?lock=20",
    stock: 90,
  },
  {
    name: "T-Shirt",
    description: "Comfortable cotton t-shirt",
    price: 499,
    category: "Clothing",
    image: "https://loremflickr.com/600/600/tshirt?lock=21",
    stock: 150,
  },
  {
    name: "Jeans",
    description: "Classic blue jeans - perfect fit",
    price: 1999,
    category: "Clothing",
    image: "https://loremflickr.com/600/600/jeans?lock=22",
    stock: 70,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`${insertedProducts.length} products inserted successfully`);

    mongoose.connection.close();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
