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