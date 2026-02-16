# Scalable Web App with Authentication & Dashboard

A scalable full-stack web application featuring secure JWT authentication, a CRUD dashboard, and a clean UI built with Next.js and Node.js.

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS / Vanilla CSS
- **State Management**: React Context API
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT & bcryptjs

## Project Structure
- `frontend/`: Next.js application source code.
- `backend/`: Express.js API server code.

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB connection string

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd intern_project
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   npm start
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Features
- **User Authentication**: Secure Sign Up and Login with JWT.
- **Protected Dashboard**: Accessible only to authenticated users.
- **CRUD Operations**: Create, Read, Update, Delete tasks.
- **Search & Filter**: Efficiently manage entities.
- **Responsive Design**: Mobile-friendly UI.
