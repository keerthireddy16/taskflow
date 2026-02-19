# TaskFlow: Frontend Developer Intern Assignment

> [!IMPORTANT]
> **⚠️ PLEASE RUN LOCALLY (DO NOT USE LIVE DEMO)**
>
> The live deployment may experience timeouts or require frequent refreshing due to free-tier hosting limits.
> **Please run the project locally** using the instructions below for the intended full-stack experience.

 Note: Due to Render's free-tier cold start behavior, the backend may take a few seconds to respond on the first request. If the login/register page appears delayed initially, a quick refresh resolves it.

⚡ Recommended: Run Locally (Full Experience)
This is a full-stack application.
You must run Backend and Frontend in two separate terminals
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

## ✅ Assignment Deliverables Checklist

- [x] **Frontend**: Built with **Next.js 14**, **TailwindCSS**, and **TypeScript**.
- [x] **Responsive Design**: Fully optimized for Mobile, Tablet, and Desktop.
- [x] **Authentication**:
    -   Secure **JWT-based** Login & Registration.
    -   **Protected Routes** (Dashboard requires login).
    -   10-minute **Inactivity Auto-Logout**.
- [x] **Dashboard**:
    -   **Drag & Drop** Kanban Board (Pending <-> Completed).
    -   **CRUD Operations**: Create, Read, Update, Delete tasks.
    -   **Search & Filter**: Real-time filtering by status and text.
    -   **User Profile**: Update Name, Email, Password.
- [x] **Backend**:
    -   **Node.js & Express** API.
    -   **MongoDB** Database with Mongoose schemas.
    -   **Security**: bcrypt password hashing, HTTP-only cookies, CORS protection.

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
