# Student Management System

A full-stack web application for managing student records and marks, built with Node.js, PostgreSQL (Neon DB), and React.js.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (Neon DB)
- **Frontend:** React.js, Bootstrap 5, SweetAlert2
- **Tools:** Postman, Vite

## Project Structure
student-management-system/
├── backend/
│   ├── configs/
│   │   └── db.js
│   ├── controllers/
│   │   ├── studentController.js
│   │   └── marksController.js
│   ├── routes/
│   │   ├── studentRoutes.js
│   │   └── marksRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── StudentModal.jsx
│   │   │   ├── StudentTable.jsx
│   │   │   └── ViewModal.jsx
│   │   ├── pages/
│   │   │   └── StudentsPage.jsx
│   │   ├── services/
│   │   │   ├── studentService.js
│   │   │   └── marksService.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
├── schema.sql
└── README.md

## Getting Started

### Prerequisites

- Node.js (v18 or above)
- Neon DB account (or any PostgreSQL database)
- npm

### Database Setup

1. Create a new project on [Neon DB](https://neon.tech)
2. Open the **SQL Editor**
3. Run the SQL script provided in `schema.sql`

### Backend Setup

1. Navigate to the backend directory:
```bash
   cd backend
```

2. Install dependencies:
```bash
   npm install
```

3. Create a `.env` file in the backend directory:

DATABASE_URL=your_neon_db_connection_string
PORT=5000
4. Start the development server:
```bash
   npm run dev
```

The backend server will start at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
   cd frontend
```

2. Install dependencies:
```bash
   npm install
```

3. Create a `.env` file in the frontend directory:

VITE_BASE_URL=http://localhost:5000

4. Start the development server:
```bash
   npm run dev
```

The frontend will start at `http://localhost:5173`

## API Endpoints

### Students

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/students | Create a new student |
| GET | /api/students | Get all students (with pagination) |
| GET | /api/students/:id | Get a single student with marks |
| PUT | /api/students/:id | Update a student |
| DELETE | /api/students/:id | Delete a student |

### Marks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/marks | Add a mark for a student |
| DELETE | /api/marks/:id | Delete a mark |

## Pagination

The GET `/api/students` endpoint supports pagination via query parameters:

GET /api/students?page=1&limit=10

Response includes metadata:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

## Features

- ✅ Create, Read, Update, Delete students
- ✅ Add and Delete marks for each student
- ✅ Pagination with configurable page size (5, 10, 25)
- ✅ Search students by name or email
- ✅ View student details with marks
- ✅ SweetAlert2 confirmations and notifications
- ✅ Responsive Bootstrap UI

## Database Schema

```sql
-- Students Table
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  age INTEGER NOT NULL,
  parent_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Marks Table
CREATE TABLE marks (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL,
  subject VARCHAR(100) NOT NULL,
  marks INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);
```