# 📁 Day 04 — Database Relationships & File Uploads

- ☑️ Design a database schema
- ☑️ Create APIs with database integration
- ☑️ Implement file upload functionality
- ☑️ Secure APIs using authentication
- ☑️ Document all endpoints

---

## 📝 Project Overview

This project handles multipart form-data uploads alongside relational database structuring inside MongoDB. It provides a secure pipeline where authenticated users can upload local media elements (Images/PDFs). The application intercepts the payload, writes the binary to disk securely, and hooks the generated document configurations directly to the dynamic ObjectId tracking reference of the creator.

---

## 🗃️ Database Relationship Model

A **One-to-Many (1:N)** relationship links the existing User collection to the new File tracking schema using references.

```text
┌────────────────┐               ┌────────────────┐
│  User Schema   │               │  File Schema   │
├────────────────┤               ├────────────────┤
│  _id           │◄──────────────┤  user (Ref)    │
│  name          │               │  filename      │
│  email         │               │  filePath      │
│  password      │               │  uploadedAt    │
└────────────────┘               └────────────────┘
```

## 📂 API Documentation

### Base URL

```http
http://localhost:5000/api
```

### 1. User Registration / Authentication

**Endpoint**

```http
POST /auth/register
```

**Payload**

```json
{
  "name": "anilabho",
  "email": "test@example.com",
  "password": "password123"
}
```

**Response**

Returns a JSON Web Token (`token`) required to authorize uploads.

---

### 2. Secure File Upload Handler

**Endpoint**

```http
POST /files/upload
```

**Authorization Header**

```http
Authorization: Bearer <your_jwt_token>
```

**Body Type**

```text
form-data
```

**Fields**

| Key | Type |
|------|------|
| file | Image/PDF |

Supported formats:

```text
.jpg
.jpeg
.png
.pdf
```

### Success Response (201 Created)

```json
{
  "success": true,
  "message": "File uploaded and linked to user successfully!",
  "data": {
    "filename": "1781539803331-474404564.jpg",
    "filePath": "D:\\sparkiit\\Internship-Tasks\\Day04\\uploads\\1781539803331-474404564.jpg",
    "user": "6a302250aa8fdab72f64fe5",
    "_id": "6a302250aa8fdab72f64fe6",
    "uploadedAt": "2026-06-15T16:10:03.334Z",
    "__v": 0
  }
}
```

### Error Responses

#### 401 Unauthorized

```json
{
  "message": "Invalid token"
}
```

#### 400 Bad Request

```json
{
  "message": "Unsupported file type"
}
```

---

## 🚀 How to Set Up and Run

### 1. Configure Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/internship_db
JWT_SECRET=your_super_secure_jwt_secret_phrase
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Server

```bash
# Development Mode
npm run dev

# Production Mode
node server.js
```

Expected console output:

```text
Server running on port 5000
MongoDB Connected
```

---

## 🔒 Features Implemented

- JWT Authentication
- Password Hashing
- Protected Routes
- MongoDB Relationships
- Secure File Uploads
- File Type Validation
- API Documentation

---