# TaskFlow: Frontend Developer Intern Assignment

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://taskflow-delta.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-blue?style=for-the-badge&logo=github)](https://github.com/keerthireddy16/taskflow)

> **🚀 Live Demo:** [https://taskflow-delta.vercel.app/](https://taskflow-delta.vercel.app/)
>
> *Note: Hosted on free-tier services. Please allow up to 30 seconds for the backend to wake up on the first request.*

---

## 📋 Assignment Overview
**Role:** Frontend Developer Intern
**Objective:** Build a Scalable Web App with Authentication & Dashboard + Basic Backend.

This project demonstrates a production-ready, full-stack application built with **Next.js 14** (Frontend) and **Node.js/Express** (Backend), deployed on **Vercel** and **Render**.

## 📤 Submission & Project Logs
This repository contains all required deliverables for the **Frontend Developer Intern** task:
-   **Source Code**: Complete frontend and backend source.
-   **Project Log**: Development diary and technical decisions in [PROJECT_LOG.md](./PROJECT_LOG.md).
-   **API Docs**: Endpoints detailed in [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).
-   **Live Demo**: [taskflow-delta.vercel.app](https://taskflow-delta.vercel.app/)

---

## ✅ Core Features Implemented

### 🎨 Frontend (Primary Focus)
-   **Modern Tech Stack**: Built with **Next.js 14 (App Router)** & **TypeScript**.
-   **Responsive Design**: Mobile-first UI using **TailwindCSS** (Fully responsive Sidebar & Dashboard).
-   **Forms & Validation**:
    -   Client-side validation with `react-hook-form`.
    -   Server-side validation with `express-validator`.
-   **Protected Routes**: Higher-Order Component protection for Dashboard & Profile pages.

### ⚙️ Backend (Supportive)
-   **API**: RESTful API built with **Node.js** & **Express**.
-   **Database**: **MongoDB Atlas** connection with Mongoose ODM.
-   **Authentication**: Secure **JWT-based** auth (HttpOnly Cookies).
-   **CRUD Operations**: Full Create, Read, Update, Delete access for Tasks.

### 📊 Dashboard Features
-   **User Profile**: Fetch and update user details (Name, Password).
-   **Task Management**:
    -   **Add Task**: Quick-add with auto-focus.
    -   **Board View**: Drag-and-drop support (UI ready).
    -   **Search & Filter**: Real-time filtering by status (Pending/Completed).
-   **Security**: Logout flow with secure cookie clearing.

### 🔒 Security & Scalability
-   **Password Hashing**: Implemented using `bcryptjs`.
-   **Secure Tokens**: JWTs stored in `HttpOnly` cookies to prevent XSS.
-   **Scalable Structure**: Service-Controller pattern for easy backend expansion.

---

## ⚡ Quick Start (Run Locally)

This is a full-stack application. You need to run the **Backend** and **Frontend** in **two separate terminals**.

### Terminal 1: Backend
1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the server:
    ```bash
    npm run dev
    ```
    *(You should see "Server running on port 5000" and "MongoDB Connected")*

### Terminal 2: Frontend
1.  Open a **new** terminal and navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the app:
    ```bash
    npm run dev
    ```
    *(Wait for "Ready in ...ms")*

### Access the App
Open your browser and go to:
👉 **[http://localhost:3000](http://localhost:3000)**

---



## 📈 Scalability Architecture (Project Note)

The application architecture is strictly **Stateless and Decoupled**. By storing session state in JWTs and delivering them via server-managed cookies, the application tier can scale horizontally across multiple instances (e.g., using a Load Balancer and Docker/Kubernetes) without requiring shared session storage or "sticky sessions."

A **Service Layer Pattern** was implemented in the backend to separate request handling from business logic. This modularity ensures that as the codebase grows, adding support for new database types or complex third-party integrations (like WebSockets or Caching layers) requires zero modification to the controller or routing layers. Furthermore, the use of **Axios Interceptors** on the frontend provides a centralized bottleneck for monitoring API latency and handling automated token refreshes or global error redirection in a high-traffic production environment.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Networking**: Axios (with custom Interceptors)
- **State Management**: React Context API
- **Animations**: Framer Motion

### Backend
- **Environment**: Node.js & Express
- **Database**: MongoDB (Mongoose ODM)
- **Security**: JWT, bcryptjs, Helmet, Cookie-Parser, express-validator
- **Logic**: Service Layer Pattern, express-async-handler

---

## 📂 Folder Structure

```text
taskflow/
├── frontend/               # Next.js Application
│   ├── src/
│   │   ├── app/           # App Router Pages & Layouts
│   │   ├── components/    # Reusable UI Components
│   │   ├── context/       # Auth & State Providers
│   │   └── services/      # Axios Interceptors & API Client
├── backend/                # Express API
│   ├── config/            # Centralized Env Configuration
│   ├── controllers/       # Route Handlers (Request/Response only)
│   ├── services/          # Business Logic & DB Operations
│   ├── middleware/        # Auth (Cookie-based), Error, Logging
│   ├── models/            # Mongoose Schemas
│   └── routes/            # API Endpoint Definitions
```

---

## 🔌 API Documentation

Detailed API documentation is available in [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

---

## 🔒 Security Implementation

TaskFlow implements enterprise-standard security patterns:
*   **HttpOnly Cookies**: JWTs are never stored in `localStorage`, mitigating the threat of cross-site scripting (XSS) token theft.
*   **CSRF Protection**: Native `SameSite: Strict` cookie attributes prevent unauthorized cross-site requests.
*   **Backend Hardening**: Integrated `helmet.js` for security headers and `express-validator` for strict schema validation.
*   **Stateless Scaling**: Authentication is managed via decentralized token verification, allowing for seamless horizontal scaling.
