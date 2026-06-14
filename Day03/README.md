# 🔒 Day 03 — JWT Authentication & Protected Routes

![Day](https://img.shields.io/badge/Day-03-purple) ![Status](https://img.shields.io/badge/Status-Complete-brightgreen) ![Tech](https://img.shields.io/badge/Tech-Node.js_%7C_MongoDB_%7C_JWT-orange)

---

## 🎯 Tasks

- [x] Implement User Registration and Login APIs.
- [x] Add JWT Authentication.
- [x] Protect private routes using custom middleware.
- [x] Connect APIs with a database.
- [x] Test all APIs using Postman.

---

## 🔐 Authentication API Reference

### **Base URL**
`http://localhost:5000/api/auth`

---

### **1. Register a New User**
Creates a new user, hashes their password, and returns a JWT token.
- **Method:** `POST`
- **Endpoint:** `/register`
- **Body (JSON):**
  ```json
  {
      "name": "Intern Tester",
      "email": "tester@example.com",
      "password": "password123"
  }
  ```

### **2. Login User**
Authenticates existing credentials and returns a JWT token for session access.
- **Method:** `POST`
- **Endpoint:** `/login`
- **Body (JSON):**
  ```json
  {
      "email": "tester@example.com",
      "password": "password123"
  }
  ```

### **3. Access Private Profile (Protected)**
Verifies the JWT token in the headers before allowing access to user data.
- **Method:** `GET`
- **Endpoint:** `/profile`
- **Headers:**
  - `Authorization: Bearer <your_jwt_token_here>`