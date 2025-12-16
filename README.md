# 🍬 Sweet Shop Management System

A full-stack **Sweet Shop Management System** built using the **MERN stack**, designed with clean architecture, RESTful APIs, JWT-based authentication, and Test-Driven Development (TDD).

The application allows users to browse and purchase sweets, while admins can manage inventory securely.

---

## 🚀 Live Demo

- **Frontend (Vercel):** (https://sweet-management-iota.vercel.app/) 
- **Backend (Render):** (https://sweet-management-613u.onrender.com)

---

## 🛠️ Tech Stack

### Backend
- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **Mongoose**
- **JWT Authentication**
- **bcryptjs**
- **Jest & Supertest (TDD)**

### Frontend
- **React**
- **Axios**
- **JWT (Authorization Header)**
- **Vercel (Deployment)**

---

## ✨ Features

### 🔐 Authentication
- User registration & login
- Password hashing using bcrypt
- Token-based authentication using JWT
- Role-based access (User / Admin)

### 🍭 Sweets Management
- View all available sweets
- Search sweets by name, category, or price range
- Add, update, and delete sweets (Admin only)

### 📦 Inventory Management
- Purchase sweets (quantity decreases automatically)
- Prevent purchase when out of stock
- Restock sweets (Admin only)

### 🧪 Testing (TDD)
- Tests written before implementation
- Covers:
  - Authentication flows
  - Authorization checks
  - Inventory edge cases
  - Error handling
- High test coverage using Jest & Supertest

---

## 📁 Backend Structure
```
server/
├── src/
│ ├── app.js
│ ├── server.js
│ ├── config/
│ │ └── db.js
│ ├── models/
│ │ ├── User.js
│ │ └── Sweet.js
│ ├── routes/
│ │ ├── auth.routes.js
│ │ └── sweet.routes.js
│ ├── controllers/
│ │ ├── auth.controller.js
│ │ └── sweet.controller.js
│ ├── services/
│ │ ├── auth.service.js
│ │ └── sweet.service.js
│ ├── middleware/
│ │ ├── auth.middleware.js
│ │ └── admin.middleware.js
│ └── tests/
│ ├── auth.test.js
│ └── sweet.test.js
└── package.json
```
---


---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Access |
|------|---------|--------|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |

### Sweets
| Method | Endpoint | Access |
|------|---------|--------|
| GET | `/api/sweets` | Auth |
| POST | `/api/sweets` | Admin |
| GET | `/api/sweets/search` | Auth |
| PUT | `/api/sweets/:id` | Admin |
| DELETE | `/api/sweets/:id` | Admin |

### Inventory
| Method | Endpoint | Access |
|------|---------|--------|
| POST | `/api/sweets/:id/purchase` | Auth |
| POST | `/api/sweets/:id/restock` | Admin |

---

## ⚙️ Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
```

▶️ Run Locally
Backend
```
cd server
npm install
cd src
node server.js
```

Backend runs on:
```
http://localhost:5000
```
Frontend
```
cd client
npm install
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```
