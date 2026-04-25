# 🛒 E-commerce Platform

A full-stack **e-commerce web application** with a React frontend and an Express + MongoDB backend. Supports user authentication, product browsing, cart management, checkout, and order tracking — plus an admin dashboard for product and order management.

## ✨ Features

### 👤 Customer
- Register, login, and manage profile
- Browse, search, and filter products
- Product detail pages
- Add/remove items from cart, update quantities
- Place orders and view order history

### 🛠️ Admin
- Create, update, and delete products
- View all orders and update order status

### 🔒 Security
- JWT-based authentication
- Protected routes on both frontend and backend
- Password hashing with bcrypt
- Secrets excluded from version control via `.gitignore`

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Vite, Tailwind CSS, React Router, Zustand, Axios |
| Backend | Node.js, Express, MongoDB, Mongoose |
| Auth | JWT, bcrypt |
| Validation | Joi |
| Tooling | ESLint, Nodemon |

## 📁 Project Structure

```
E-commerce-Platform/
├── client/          # React frontend (Vite + Tailwind)
│   └── src/
└── server/          # Express REST API + MongoDB
    ├── routes/
    ├── models/
    ├── middleware/
    └── controllers/
```

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/anshuman-gkp1/E-commerce-Platform.git
cd E-commerce-Platform
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create a `.env` file in `/server`:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd client
npm install
```

Create a `.env` file in `/client`:
```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🔌 API Endpoints

| Resource | Endpoints |
|----------|-----------|
| Auth | `POST /api/auth/register`, `POST /api/auth/login` |
| Products | `GET /api/products`, `POST /api/products` (admin) |
| Cart | `GET /api/cart`, `POST /api/cart/add`, `DELETE /api/cart/:id` |
| Orders | `POST /api/orders`, `GET /api/orders/my`, `GET /api/orders` (admin) |

## 🔮 Future Improvements
- Payment gateway integration (Stripe)
- Unit and integration tests
- CI/CD pipeline and cloud deployment
- Role-based audit logging
