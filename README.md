# Scalable Web App with Authentication & Dashboard

A scalable full-stack web application featuring secure JWT authentication, a CRUD dashboard, and a clean UI built with Next.js and Node.js.

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Axios

### Backend
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT & bcryptjs
- **Security**: Helmet, CORS, Input Validation (express-validator)

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd intern_project
   ```

2. **Backend Setup:**
   - Create a `.env` file in the `backend` folder:
     ```
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
   - Install and run:
     ```bash
     cd backend
     npm install
     npm run dev
     ```

3. **Frontend Setup:**
   - Create a `.env.local` file in the `frontend` folder:
     ```
     NEXT_PUBLIC_API_URL=http://localhost:5000/api
     ```
   - Install and run:
     ```bash
     cd frontend
     npm install
     npm run dev
     ```
   - Open [http://localhost:3000](http://localhost:3000)

## API Documentation

### Authentication

| Method | Endpoint | Description |
|Params/Body|
|---|---|---|---|
| **POST** | `/api/auth/register` | Register a new user | `{ name, email, password }` |
| **POST** | `/api/auth/login` | Authenticate user | `{ email, password }` |
| **GET** | `/api/auth/me` | Get current user info | Headers: `Authorization: Bearer <token>` |

### Tasks

| Method | Endpoint | Description | Params/Body |
|---|---|---|---|
| **GET** | `/api/tasks` | Get all user tasks | Headers: `Authorization: Bearer <token>` |
| **POST** | `/api/tasks` | Create a new task | `{ text }`, Headers: `Authorization: Bearer <token>` |
| **PUT** | `/api/tasks/:id` | Update a task | `{ text, completed }`, Headers: `Authorization: Bearer <token>` |
| **DELETE** | `/api/tasks/:id` | Delete a task | Headers: `Authorization: Bearer <token>` |

## Scalability & Security Features

- **Modular Architecture**: Backend controllers, routes, and models are separated for maintainability.
- **Security**:
  - **Passwords**: Hashed using `bcryptjs`.
  - **Authentication**: JWT strategy for stateless auth.
  - **Headers**: `helmet` usage for secure HTTP headers.
  - **Validation**: Server-side input validation using `express-validator` to prevent bad data and injection attacks.
- **Frontend**:
  - **Optimization**: Next.js static and server-side optimization capabilities.
  - **Reusable Components**: Modular React components (Navbar, AuthContext).
