# 30 Days MERN Challenge

This repository contains my 30-day journey learning and building projects using the **MERN stack**, focusing on backend APIs, frontend apps, and full-stack projects.

---

## Tech Stack


- **MongoDB** – NoSQL database for storing data
- **Express.js** – Backend framework for building APIs
- **React.js** – Frontend library for building UIs
- **Node.js** – Backend runtime environment
- **Tailwind CSS** – Utility-first CSS framework for styling

---

## Progress / Projects

| Day | Project                           | Description                                  |
| --- | --------------------------------- | -------------------------------------------- |
| 1   | Server Setup & Basic API          | Setup Node.js server and Express routes      |
| 2   | Express Server with Routing       | Created structured routes for APIs           |
| 3   | Notes CRUD API                    | Built Notes API with full CRUD functionality |
| 4   | Notes API + Database Integration  | Integrated MongoDB for persistent storage    |
| 5   | Todo API (Production Level)       | Full-featured Todo API with validation       |
| 6   | Clean & Scalable API Architecture | Refactored APIs for maintainability          |
| 7   | Todo API Documentation            | Wrote professional README & API docs         |
| 8   | Todo API with Authentication      | Implemented POST /api/users & JWT auth      |
| 9   | Full-Stack MERN Todo App        | Implemented full MERN stack Todo app with JWT authentication, user registration, login, and CRUD operations for todos | 
| 10 | Secure MERN Todo App | Implemented protected routes, improved UI/UX, and handled authentication-based access for a smoother user experience |
| 11 | Full CRUD MERN Todo App | Implemented complete CRUD functionality with interactive UI, improved state management, and structured API for a production-like experience |
| 12 | Enhanced MERN Todo App | Improved UI responsiveness, optimized component structure, added user feedback handling, and refined overall app performance for a smoother experience |
| 13 | Smart Todo App (Search + Filter) | Added real-time search, filtering options, and persistent dark mode to enhance usability and make the app more dynamic and user-friendly |
| 14 | Advanced Todo App (Edit + UX Improvements) | Implemented inline editing, toast notifications, loading states, and error handling to enhance user interaction and achieve a production-level experience |
| 15 | Secure Todo App with Protected Routes | Implemented authentication flow with protected routes, global auth state, and seamless redirects to build a secure and structured application |


---

## Day 7 — Todo API Documentation

## How to Test

- Use Postman or Thunder Client to test API endpoints.  
- Make sure your backend server is running on http://localhost:5000

### ➤ Create Todo
**POST** `/api/todos`

**Request Body:**
```json
{
  "title": "Learn Backend"
}

Response:

{
  "_id": "123",
  "title": "Learn Backend",
  "completed": false
}

Error Response:

{
  "error": "Title is required"
}


➤ Get All Todos

GET /api/todos

Response:

[
  {
    "_id": "123",
    "title": "Learn Backend",
    "completed": false
  },
  {
    "_id": "124",
    "title": "Learn MERN",
    "completed": true
  }
]


➤ Update Todo

PUT /api/todos/:id

Request Body:

{
  "title": "Learn MERN",
  "completed": true
}

Response:

{
  "_id": "123",
  "title": "Learn MERN",
  "completed": true
}

Error Response:

{
  "error": "Todo not found"
}


➤ Delete Todo

DELETE /api/todos/:id

Response:

{
  "message": "Todo deleted successfully"
}

Error Response:

{
  "error": "Todo not found"
}


