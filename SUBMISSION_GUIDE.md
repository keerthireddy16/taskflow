# Assignment Submission Guide

Here is a checklist and guide to help you package your assignment for submission.

## 1. Verify Expected Deliverables

Ensure your project contains the following files which satisfy the assignment requirements:

*   **Frontend**: `frontend/` (Next.js 14, TailwindCSS, Context API)
*   **Backend**: `backend/` (Node.js, Express, MongoDB, JWT/Cookies)
*   **API Documentation**: `API_DOCUMENTATION.md` (Detailed endpoints)
*   **Project Overview**: `README.md` (Setup, Architecture, Scalability)

## 2. Generating Log Files

The assignment asks for "log files". Since this is a standard Node.js app, you should capture the output of your server startup and some sample requests.

**How to capture logs:**

1.  Stop any running servers.
2.  Open your terminal/command prompt.
3.  Navigate to the `backend` directory.
4.  Run the server and pipe the output to a file (or just copy-paste it).

**Windows (PowerShell):**
```powershell
cd backend
npm run dev | Tee-Object -FilePath "server_logs.txt"
```
*If `Tee-Object` isn't available, just run `npm run dev`, interact with the app (login, create task), then copy all the terminal text into a new file named `server_logs.txt`.*

## 3. Final Checklist

- [ ] **Responsive UI**: Check dashboard on mobile view.
- [ ] **Auth**: Test Register -> Login -> Logout flow.
- [ ] **CRUD**: Create, Edit, and Delete a Task.
- [ ] **Theme**: Toggle Light/Dark mode.
- [ ] **Security**: Verify `httpOnly` cookie is set upon login (Inspect Element -> Application -> Cookies).

## 4. How to Submit

1.  Push this entire project to a public **GitHub Repository**.
2.  Email the repository link and your `server_logs.txt` as requested.
