# ⚙️ Day 02 — Database Integration & CRUD Operations

![Day](https://img.shields.io/badge/Day-02-purple) ![Status](https://img.shields.io/badge/Status-Complete-brightgreen) ![Tech](https://img.shields.io/badge/Tech-Node.js_%7C_MongoDB-orange)

---

## 🎯 Tasks

- [x] Create CRUD APIs (Create, Read, Update, Delete).
- [x] Connect APIs with a database.
- [x] Test endpoints using Postman.
- [x] Implement proper error responses.
- [x] Document APIs with sample requests and responses.

# Intern Management API

## Base URL
`http://localhost:5000/api/interns`

---

### 1. Get All Interns
- **Method:** GET
- **Endpoint:** /
- **Description:** Retrieves a list of all interns in the database.
- **Success Response (200 OK):**
    {
        "success": true,
        "count": 1,
        "data": [
            {
                "_id": "65f2a1b...",
                "name": "Alex Smith",
                "email": "alex.smith@example.com",
                "department": "Engineering",
                "status": "onboarding"
            }
        ]
    }

### 2. Create New Intern
- **Method:** POST
- **Endpoint:** /
- **Description:** Adds a new intern to the system.
- **Body (JSON):**
    {
        "name": "Alex Smith",
        "email": "alex.smith@example.com",
        "department": "Engineering"
    }
- **Success Response (201 Created):** Returns the newly created intern object.
- **Error Response (400 Bad Request):** If validation fails (e.g., missing email).

### 3. Get Single Intern
- **Method:** GET
- **Endpoint:** /:id
- **Description:** Retrieves a specific intern by their unique ID.
- **Success Response (200 OK):** Returns the requested intern object.
- **Error Response (404 Not Found):** If the ID does not exist or format is invalid.

### 4. Update Intern
- **Method:** PUT
- **Endpoint:** /:id
- **Description:** Updates an existing intern's details.
- **Body (JSON):** (Include only the fields you want to update)
    {
        "status": "active"
    }
- **Success Response (200 OK):** Returns the updated intern object.

### 5. Delete Intern
- **Method:** DELETE
- **Endpoint:** /:id
- **Description:** Removes an intern from the database.
- **Success Response (200 OK):**
    {
        "success": true,
        "message": "Intern deleted"
    }