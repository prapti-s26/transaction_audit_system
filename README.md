# 💸 Transaction Audit System – Full Stack Assignment (GET 2026)

## 📌 Project Overview

This project is a **full-stack Transaction Audit System** that simulates a simple
**peer-to-peer fund transfer** mechanism with a **mandatory and immutable audit log**.

The system ensures:
- Secure authentication
- Atomic money transfers
- Consistent database updates
- Complete audit trail for transparency

The backend is built using **Node.js, Express, and PostgreSQL**, and the frontend is developed using **React** with a clean and responsive UI.

---

## 🧱 Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication

### Frontend
- React
- Axios
- Custom CSS (Modern UI)

---

## ⚙️ Setup & Run Instructions

### 🔹 Prerequisites
- Node.js (v18+)
- PostgreSQL
- npm

---

### 🔹 Backend Setup

```bash
cd backend
npm install
````

Create a `.env` file inside `backend/`:

```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/transaction_db
JWT_SECRET=your_jwt_secret
```

Start backend server:

```bash
node src/app.js
```

Backend runs on:

```
http://localhost:5000
```

---

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## 🔐 API Documentation

### Authentication APIs

#### POST `/login`

* Authenticates a user
* Returns JWT token

#### POST `/signup`

* Creates a new user
* Validates password strength
* Prevents duplicate users

---

### Transaction APIs

#### POST `/api/transfer`

* Transfers funds from sender to receiver
* Wrapped inside a **database transaction**
* Ensures atomicity (both debit & credit succeed or fail)

#### GET `/api/history`

* Returns transaction history for authenticated user
* Uses JWT-based authorization

---

## 🗄️ Database Schema

### users table

| Column   | Description   |
| -------- | ------------- |
| id       | Primary Key   |
| name     | User name     |
| email    | User email    |
| password | User password |
| balance  | User balance  |

---

### transactions table

| Column      | Description             |
| ----------- | ----------------------- |
| id          | Primary Key             |
| sender_id   | Sender user ID          |
| receiver_id | Receiver user ID        |
| amount      | Transaction amount      |
| timestamp   | Transaction date & time |
| status      | SUCCESS / FAILED        |

---

## 🎨 Frontend Features

* Login & Signup flow
* Password validation with rules
* Transfer money form
* Real-time transaction history update
* Sortable transaction table
* Logout functionality
* Responsive & modern UI

---

## 🧠 AI Tool Usage Log (MANDATORY)

### 🤖 AI-Assisted Tasks

AI tools (ChatGPT) were used for:

* Generating Express backend boilerplate
* Designing PostgreSQL database schema
* Implementing database transactions for fund transfer
* JWT authentication logic
* Error handling and validation logic
* Debugging frontend-backend integration
* Improving UI structure and styling

---

### 📊 Effectiveness Score

**Score: 4 / 5**

AI tools significantly reduced development time by generating boilerplate code and helping debug issues. Manual effort was still required for integration, UI refinement, and handling edge cases.


