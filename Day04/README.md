# 📂 Day 04 — Database Relationships & File Uploads

- [x] Design a database schema
- [x] Create APIs with database integration
- [x] Implement file upload functionality
- [x] Secure APIs using authentication
- [x] Document all endpoints

---

## 📝 Project Overview
This project handles multipart form-data uploads alongside relational database structuring inside MongoDB. It provides a secure pipeline where authenticated users can upload local media elements (Images/PDFs). The application intercepts the payload, writes the binary to disk securely, and hooks the generated document configurations directly to the dynamic `ObjectId` tracking reference of the creator.

---

## 🏗️ Folder Structure
The system isolates its concerns using a modular design structure:

```text
Day04/
├── config/             # Database core connection settings
│   └── db.js
├── controllers/        # Request handling logical orchestrators
│   ├── authController.js
│   └── fileController.js
├── middlewares/        # Upload streams & token validation filters
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   └── uploadMiddleware.js
├── models/             # Schema configuration structures
│   ├── File.js
│   └── User.js
├── routes/             # API routing endpoints
│   ├── authRoutes.js
│   └── fileRoutes.js
├── uploads/            # Local directory for stored binaries
├── .env                # Secret keys and connection parameters
└── server.js           # Express main server entrypoint


🗃️ Database Relationship Model
A One-to-Many (1:N) relationship links the existing User collection to the new File tracking schema using references.

Plaintext
┌────────────────┐               ┌────────────────┐
│  User Schema   │               │  File Schema   │
├────────────────┤               ├────────────────┤
│  _id           │◄──────────────┤  user (Ref)    │
│  name          │               │  filename      │
│  email         │               │  filePath      │
│  password      │               │  uploadedAt    │
└────────────────┘               └────────────────┘
📂 API Documentation
Base URL
http://localhost:5000/api

1. User Registration / Authentication
Endpoint: POST /auth/register

Payload (JSON):

JSON
  {
    "name": "anilabho",
    "email": "test@example.com",
    "password": "password123"
  }
Response: Returns a JSON Web Token (token) required to authorize uploads.

2. Secure File Upload Handler
Endpoint: POST /files/upload

Security: Requires Authorization header set to Bearer <your_jwt_token>

Body Type: form-data

Fields:

file : (File Binary — Supports .jpg, .jpeg, .png, .pdf)

Success Response (201 Created)
JSON
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
Error Profiles
401 Unauthorized: Token missing or invalid signature.

400 Bad Request: Unsupported file format or missing key field.

🚀 How to Set Up and Run Globally
Follow these quick commands to spin up the environment sandbox:

1. Configure Local Environment Variables
Create a file named .env in the root directory of Day04 and supply the following targets:

Code snippet
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/internship_db
JWT_SECRET=your_super_secure_jwt_secret_phrase
2. Dependency Assembly
Install all packages defined inside the package tree configuration:

Bash
npm install
3. Start the Server Instances
Run the server process using nodemon for automatic hot-reloading or via plain node:

Bash
# Launch with nodemon hot-reloads
npm run dev

# Launch using production standard node
node server.js
The terminal log interface will verify the connection statuses:

Plaintext
Server running on port 5000
MongoDB Connected