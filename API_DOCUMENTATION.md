# TaskFlow API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

### Register User
**Endpoint:** `POST /auth/register`
**Description:** Register a new user and set a secure HttpOnly cookie.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "_id": "60d0fe4f5311236168a109ca",
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Login User
**Endpoint:** `POST /auth/login`
**Description:** Authenticate user and set a secure HttpOnly cookie.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "_id": "60d0fe4f5311236168a109ca",
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Logout User
**Endpoint:** `POST /auth/logout`
**Description:** Clear the authentication cookie.

**Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

### Get Current User
**Endpoint:** `GET /auth/me`
**Description:** Get the currently authenticated user's profile.
**Headers:** Cookie containing JWT (automatically sent by browser)

**Response (200 OK):**
```json
{
  "_id": "60d0fe4f5311236168a109ca",
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Update User Profile
**Endpoint:** `PUT /auth/profile`
**Description:** Update the authenticated user's name, email, or password.
**Headers:** Cookie containing JWT.

**Request Body:**
```json
{
  "name": "John Updated",
  "email": "newemail@example.com",
  "password": "newpassword123"
}
```

**Response (200 OK):**
```json
{
  "_id": "60d0fe4f5311236168a109ca",
  "name": "John Updated",
  "email": "newemail@example.com"
}
```

## Tasks (Sample Entity)

### Get All Tasks
**Endpoint:** `GET /tasks`
**Description:** Get all tasks for the logged-in user.

**Response (200 OK):**
```json
[
  {
    "_id": "60d0fe4f5311236168a109cb",
    "user": "60d0fe4f5311236168a109ca",
    "text": "Complete the assignment",
    "completed": false,
    "createdAt": "2024-02-14T10:00:00.000Z",
    "updatedAt": "2024-02-14T10:00:00.000Z"
  }
]
```

### Create Task
**Endpoint:** `POST /tasks`
**Description:** Create a new task.

**Request Body:**
```json
{
  "text": "New Task Item"
}
```

**Response (200 OK):**
```json
{
  "_id": "60d0fe4f5311236168a109cc",
  "user": "60d0fe4f5311236168a109ca",
  "text": "New Task Item",
  "completed": false,
  "createdAt": "2024-02-14T10:05:00.000Z",
  "updatedAt": "2024-02-14T10:05:00.000Z"
}
```

### Update Task
**Endpoint:** `PUT /tasks/:id`
**Description:** Update a task's text or completion status.

**Request Body:**
```json
{
  "text": "Updated Task Item",
  "completed": true
}
```

**Response (200 OK):**
```json
{
  "_id": "60d0fe4f5311236168a109cc",
  "user": "60d0fe4f5311236168a109ca",
  "text": "Updated Task Item",
  "completed": true,
  "createdAt": "2024-02-14T10:05:00.000Z",
  "updatedAt": "2024-02-14T10:10:00.000Z"
}
```

### Delete Task
**Endpoint:** `DELETE /tasks/:id`
**Description:** Delete a specific task.

**Response (200 OK):**
```json
{
  "id": "60d0fe4f5311236168a109cc"
}
```
