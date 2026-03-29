# E-Commerce Backend

Express.js backend for the e-commerce application.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Update `config/config.env` with your MongoDB URI and JWT secret:

   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/address` - Update user address (protected)

### Products

- `GET /api/products` - Get all products (with pagination, filtering, search)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart

- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart/add` - Add item to cart (protected)
- `POST /api/cart/remove` - Remove item from cart (protected)
- `PUT /api/cart/update` - Update item quantity (protected)
- `DELETE /api/cart/clear` - Clear cart (protected)

### Orders

- `POST /api/orders` - Create order (protected)
- `GET /api/orders/user` - Get user orders (protected)
- `GET /api/orders/all` - Get all orders (admin)
- `GET /api/orders/:id` - Get single order (protected)
- `PUT /api/orders/:id` - Update order status (admin)
