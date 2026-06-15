# 📂 Day 04 — Database Relationships & File Uploads

![Day](https://img.shields.io/badge/Day-04-blue) ![Status](https://img.shields.io/badge/Status-Complete-brightgreen) ![Tech](https://img.shields.io/badge/Tech-Node.js_%7C_MongoDB_%7C_Multer-blue)

---

## 🎯 Tasks

- [x] Design a database schema.
- [x] Create APIs with database integration.
- [x] Implement file upload functionality.
- [x] Secure APIs using authentication.
- [x] Document all endpoints.

---

## 📂 File Upload API Reference

### **Base URL**
`http://localhost:5000/api/files`

---

### **1. Upload a File (Protected)**
Uploads an image or PDF file and links it directly to the authenticated user's ID in the database.
- **Method:** `POST`
- **Endpoint:** `/upload`
- **Headers:**
  - `Authorization: Bearer <your_jwt_token_here>`
- **Body (form-data):**
  - `file`: (File binary)