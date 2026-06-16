# 🚀 Internship Management API (Node.js/Express)

A robust, production-ready RESTful API built to manage internship programs. This backend service handles secure user authentication, role-based access control, file management, project tracking, and dynamic PDF certificate generation. 

Built as the backend foundation for a full MERN stack application.

## ✅ Project Tasks

- [x] 1. Build APIs for document upload and retrieval.
- [x] 2. Create authentication and user management modules.
- [x] 3. Implement role-based access control.
- [x] 4. Develop certificate generation APIs.
- [x] 5. Create analytics APIs for dashboards.
- [x] 6. Build CRUD operations for project modules.
- [x] 7. Implement logging and error handling.
- [ ] 8. Optimize database queries.
- [x] 9. Create API documentation.
- [ ] 10. Deploy and test backend services.

---

## ✨ Key Features
- **Secure Authentication:** JWT-based login and registration with bcrypt password hashing.
- **Role-Based Access Control (RBAC):** Distinct privileges for `admin` and standard `user` accounts.
- **Document Management:** Secure file upload (via Multer) and authenticated file retrieval streams.
- **Dynamic PDF Generation:** Instant, on-the-fly rendering of customized completion certificates using `pdfkit`.
- **Project CRUD Operations:** Full lifecycle management for intern projects.
- **Admin Analytics Dashboard:** Parallelized database queries for high-performance system metrics.
- **Professional Logging & Error Handling:** Global error trapping and request logging via `morgan`.

---

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose ORM
- **Security:** jsonwebtoken (JWT), bcryptjs
- **Utilities:** Multer (File Uploads), PDFKit (PDF Generation), Morgan (Logging), Dotenv

---

## ⚙️ Local Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-github-repo-url>
   cd Internship-Tasks
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/intern_management
   JWT_SECRET=your_super_secret_key_here
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

---

## 📡 API Endpoints Reference

### 🔐 Authentication & Users
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Authenticate user & get token |
| `GET` | `/api/auth/users` | **Admin** | Get all registered users |

### 📂 File Management
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/files/upload` | Private | Upload a document/image |
| `GET` | `/api/files/:id` | Private/Admin| Securely download a specific file |

### 📊 Admin Analytics
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/analytics` | **Admin** | Fetch system-wide metrics |

### 🎓 Certificates
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/certificates/generate` | Private | Stream a dynamically generated PDF |

### 📋 Projects (CRUD)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/projects` | Private | Create a new project |
| `GET` | `/api/projects` | Private | Get logged-in user's projects |
| `PUT` | `/api/projects/:id` | Private | Update an existing project |
| `DELETE` | `/api/projects/:id`| Private | Delete a project |

---

## 👨‍💻 Developed By
**Anilabho Basak** *Specializing in AI/ML & MERN Stack Development*