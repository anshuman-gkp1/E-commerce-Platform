# E-commerce Platform

A full-stack e-commerce application with a React frontend and an Express + MongoDB backend.
It supports user authentication, product browsing, cart management, checkout, and order tracking, with admin controls for product and order management.

## What this project includes

- Customer authentication (register, login, profile)
- Product listing, search, filtering, and product detail pages
- Shopping cart operations (add, remove, update quantity, clear cart)
- Order creation and order history
- Admin capabilities for product CRUD and order status updates
- REST API architecture with protected routes and JWT-based authorization

## Tech stack

- Frontend: React, Vite, Tailwind CSS, Axios, React Router, Zustand
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, Joi
- Tooling: ESLint, Nodemon

## Project structure

- client: React frontend app
- server: Express API and database layer

## Quick start

1. Clone the repository
2. Install dependencies in both client and server folders
3. Configure environment variables
4. Start backend and frontend development servers

## Environment setup

Create local environment files for your machine and keep secrets private.

Backend (example values):

- NODE_ENV=development
- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret
- STRIPE_SECRET_KEY=your_stripe_secret_key

Frontend (example values):

- VITE_API_URL=http://localhost:5000/api

## API highlights

- Auth: register, login, current user, update address
- Products: list, detail, create, update, delete
- Cart: get, add, remove, update, clear
- Orders: create, user orders, all orders (admin), update status (admin)

## Security note

Sensitive files are excluded from version control through gitignore rules, including local environment files.
Use example env files for sharing configuration format, and keep real credentials only in local env files.

## Future improvements

- Payment gateway integration hardening
- Unit and integration tests
- CI pipeline and deployment configuration
- Role-based audit logging and monitoring
