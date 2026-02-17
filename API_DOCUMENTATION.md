# TaskFlow API Documentation

Base URL: `https://taskflow-delta.vercel.app/api` (or your backend URL)

## Authentication

### Register
Create a new user account.
- **URL**: `/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response**: `201 Created` - Returns user data and sets HTTP-only cookie.

### Login
Authenticate an existing user.
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response**: `200 OK` - Returns user data and sets HTTP-only cookie.

### Get Current User
Get the profile of the currently logged-in user.
- **URL**: `/auth/me`
- **Method**: `GET`
- **Headers**: Cookie (automatically sent by browser)
- **Response**: `200 OK` - Returns user profile data.

### Update Profile
Update user details.
- **URL**: `/auth/profile`
- **Method**: `PUT`
- **Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "newpassword123" // Optional
  }
  ```
- **Response**: `200 OK` - Returns updated user data.

### Logout
Clear the authentication cookie.
- **URL**: `/auth/logout`
- **Method**: `POST`
- **Response**: `200 OK` - Clears cookie.

---

## Tasks

### Get All Tasks
Retrieve all tasks for the logged-in user.
- **URL**: `/tasks`
- **Method**: `GET`
- **Response**: `200 OK` - Array of task objects.

### Create Task
Add a new task.
- **URL**: `/tasks`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "text": "Complete the assignment"
  }
  ```
- **Response**: `201 Created` - Returns created task object.

### Update Task
Update a task's status or text.
- **URL**: `/tasks/:id`
- **Method**: `PUT`
- **Body**:
  ```json
  {
    "text": "Updated task text",     // Optional
    "completed": true              // Optional
  }
  ```
- **Response**: `200 OK` - Returns updated task.

### Delete Task
Permanently remove a task.
- **URL**: `/tasks/:id`
- **Method**: `DELETE`
- **Response**: `200 OK` - Confirmation message.
