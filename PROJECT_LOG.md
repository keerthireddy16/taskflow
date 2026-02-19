# Project Log & Development Summary

**Candidate**: Keerthi Reddy
**Project**: TaskFlow - Scalable Web App with Authentication & Dashboard
**Date**: Feb 17, 2026

---

## 📅 Development Timeline

### Day 1: Project Setup & Architecture
-   **Tech Stack Selection**: Chosen **Next.js 14** (App Router) for the frontend due to its server-side rendering capabilities and SEO benefits. Selected **Node.js/Express** for the backend to maintain a JavaScript-everywhere stack.
-   **Database**: Set up **MongoDB Atlas** for a scalable, document-oriented database.
-   **Authentication**: Implemented standard JWT authentication with `HttpOnly` cookies for maximum security (preventing XSS attacks).
-   **Repo Setup**: initialized Git repository with clear commit history.

### Day 2: Core Feature Implementation
-   **Backend API**:
    -   Created robust REST API endpoints for `Auth` (register, login, me, logout) and `Tasks` (CRUD).
    -   Implemented Mongoose schemas with validation.
    -   Added error handling middleware.
-   **Frontend UI**:
    -   Built responsive `Login` and `Register` pages with form validation using React Hook Form.
    -   Developed the `Dashboard` with a clean, grid-based layout.
    -   integrated `lucide-react` for modern, lightweight icons.
    -   Connected Frontend to Backend using `Axios` with interceptors for handling 401 (unauthorized) responses automatically.

### Day 3: Polish, Branding & Deployment
-   **Branding**:
    -   Updated primary brand color to **Blue** (`blue-600`) per feedback.
    -   Added a dynamic **Favicon** (`icon.tsx`) to ensure consistent branding in browser tabs.
-   **User Experience (UX)**:
    -   Added **"Home"** navigation links to Sidebar and Auth pages for better routing.
    -   Implemented a **"Server Waking Up"** notification to inform users about cold-start delays on free-tier hosting (Render).
    -   Added a **Dark/Light Mode** toggle for accessibility.
-   **Refactoring**:
    -   Fixed `Button.tsx` type errors.
    -   Ensured `About` links open in a new tab.
    -   Hardened `AuthContext` to handle slow connections gracefully.
    -   Ensure cookies are configured correctly for cross-origin requests.

### Day 4: Final Polish & UI Refinements
-   **Hero Section**:
    -   Adjusted landing page layout for better responsiveness.
    -   Restored original container padding based on design reference.
    -   Updated typography colors to match the desired brand aesthetic ("Manage tasks with" in primary color).
-   **Navigation**:
    -   Excluded the Dashboard sidebar from the Landing Page for a cleaner public view.
    -   Fixed scroll behavior on "Tasks" link to prevent jarring jumps.
-   **Documentation**:
    -   Finalized `PROJECT_LOG.md` and `README.md` for submission.

---

## 🛠 Technical Decisions & Scalability

1.  **Stateless Authentication**:
    -   Using JWTs stored in `HttpOnly` cookies sets the foundation for horizontal scaling. Since the server doesn't hold session state, we can easily add more backend instances behind a load balancer without "sticky sessions".

2.  **Component Architecture**:
    -   Frontend is built with small, reusable UI components (`Card`, `Button`, `Input`) following atomic design principles.
    -   `Sidebar` and `Layout` are decoupled from specific page logic.

3.  **Performance**:
    -   Next.js App Router optimizes initial load.
    -   `lucide-react` icons are tree-shaken to reduce bundle size.
    -   Axios interceptors handle token refreshing (prepared for future implementation) and global error handling.

---

## 🚀 Deployment Status

-   **Frontend**: Deployed on **Vercel** (`https://taskflow-delta.vercel.app/`)
-   **Backend**: Deployed on **Render**
-   **CI/CD**: Automatic deployments configured for `main` branch pushes.

---

## 📝 Pending Improvements (Future Roadmap)

-   **Drag & Drop**: Implement KanBan board view for tasks.
-   **WebSockets**: Real-time task updates for team collaboration.
-   **Analytics**: Visual charts for task completion rates.

---

*This log serves as a summary of the development process and design choices made during the assignment.*
