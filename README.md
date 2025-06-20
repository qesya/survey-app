# 📝 Survey App – Local & Docker Setup Guide

This project is a full-stack survey application structured as a monorepo. It includes a **frontend (client)** and a **backend (server)** built with **Vite**, **Node.js**, and **SQLite**.

You can run it using either a **local environment** or **Docker containers**.

---

## 🔧 Option 1: Run Locally (Node + Yarn)

### 1. Install All Dependencies (from root)
```bash
yarn install:all
```

### 2. Configure Environment Files

#### `client/.env`
```
VITE_API_BASE_URL=http://localhost:3001/api
```

#### `backend/.env`
```
DATABASE_URL="file:./dev.sqlite3"
JWT_SECRET="your-super-secret-key-that-is-long-and-secure"
GEMINI_API_KEY="your-gemini-api-key"
```

### 3. Prepare the Local SQLite Database
```bash
yarn db:migrate
```

### 4. Start Both Apps (in separate terminals)

#### Backend
```bash
cd backend
yarn dev
```

#### Client
```bash
cd client
yarn dev
```

### 5. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001/api

---

## 🐳 Option 2: Run via Docker

### 1. Build and Start Containers
```bash
docker-compose up --build -d
```

### 2. Run Database Migrations Inside the Container
```bash
docker-compose exec server yarn db:migrate
```

### 3. Access the Application
- Frontend: http://localhost:8080
- Backend API: http://localhost:3001/api

---

## ✅ Notes

- `.env` files must be manually created in both `client/` and `backend/` directories before starting the app.
- Docker shares the same `.env` configs as local development — ensure these are in place first.
- Default database: `dev.sqlite3`, stored locally or within the container.

---

## 👤 Test User Login

Use the following credentials to log into the app:

- **Email**: `admin@email.com`
- **Password**: `123`

> These are predefined test credentials for demo and local development purposes only.
