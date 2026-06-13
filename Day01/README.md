# 🛠️ Day 01 — Fundamental REST APIs (GET & POST)

![Day](https://img.shields.io/badge/Day-01-blue) ![Status](https://img.shields.io/badge/Status-Complete-brightgreen) ![Tech](https://img.shields.io/badge/Tech-Node.js_%7C_Express-orange)

---

## 🎯 Tasks

- [x] Build and test 2 REST APIs.
- [x] GET API for retrieving data.
- [x] POST API for creating/submitting data.
- [x] Document API endpoints and sample requests/responses.

---

## 📌 Overview

This directory contains my Day 01 task for the Backend Development internship. It is a lightweight RESTful API built with Node.js and Express.js. The application uses an in-memory data array to manage an intern roster, demonstrating fundamental API routing and HTTP methods.

### ⚙️ Prerequisites
- Node.js installed.
- VS Code with the **Thunder Client** extension installed for API testing.

### 🚀 How to Run Locally

1. Open your terminal and navigate to this folder.
2. Install the dependencies:
    npm install
3. Start the server:
    node index.js
4. The server will start running at `http://localhost:3000`.

---

## ⚡ Testing with Thunder Client

Once the server is running, you can test the APIs directly inside VS Code:
1. Click the Thunder Client lightning bolt icon in your VS Code sidebar.
2. Click **New Request**.
3. Use the endpoints documented below to test the GET and POST methods.

---

## 📂 API Documentation

### Base URL
`http://localhost:3000/api/interns`

---

### 1. Get All Interns
- **Method:** GET
- **Endpoint:** /
- **Description:** Retrieves the complete list of current interns in the system.
- **Success Response (200 OK):**
    [
        {
            "id": 1,
            "name": "Anilabho",
            "domain": "Backend"
        },
        {
            "id": 2,
            "name": "Shreyam",
            "domain": "AIML"
        }
    ]

### 2. Add a New Intern
- **Method:** POST
- **Endpoint:** /
- **Description:** Submits a new intern profile to the roster.
- **Headers:** Content-Type: application/json
- **Body (JSON):**
    {
        "name": "Irfan",
        "domain": "UI/UX"
    }
- **Success Response (201 Created):**
    {
        "id": 3,
        "name": "Irfan",
        "domain": "UI/UX"
    }