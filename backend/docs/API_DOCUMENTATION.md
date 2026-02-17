# TaskFlow API Documentation

This document provides formal technical specifications for the TaskFlow backend API.

## 📡 Base URL
`http://localhost:5000/api`

## 🔒 Authentication
The API uses **JWT (JSON Web Token)** based authentication stored in **HttpOnly Cookies**.
- **Cookie Name**: `jwt`
- **Security**: `HttpOnly`, `SameSite: Strict`, `Secure` (in production).
- **Expiration**: 30 Days.

---

## 👤 Authentication Endpoints

### 1. Register User
`POST /auth/register`
- **Access**: Public
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "data": {
    "_id": "65d1...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 2. Login User
`POST /auth/login`
- **Access**: Public
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "_id": "65d1...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 3. Logout User
`POST /auth/logout`
- **Access**: Public (Clears Cookie)
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### 4. Get Current User
`GET /auth/me`
- **Access**: Private (Requires Valid Cookie)
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "_id": "65d1...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## ✅ Task Endpoints

### 1. Fetch All Tasks
`GET /tasks`
- **Access**: Private
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "65d2...",
      "text": "Complete the intern assignment",
      "completed": false,
      "user": "65d1...",
      "createdAt": "2024-02-17T06:40:00.000Z"
    }
  ]
}
```

### 2. Create Task
`POST /tasks`
- **Access**: Private
- **Body**:
```json
{
  "text": "New production task"
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "data": {
    "_id": "65d2...",
    "text": "New production task",
    "completed": false,
    "user": "65d1...",
    "createdAt": "2024-02-17T06:40:10.000Z"
  }
}
```

### 3. Update Task
`PUT /tasks/:id`
- **Access**: Private
- **Body** (Partial updates allowed):
```json
{
  "text": "Updated task name",
  "completed": true
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
     "_id": "65d2...",
     "text": "Updated task name",
     "completed": true,
     "user": "65d1..."
  }
}
```

### 4. Delete Task
`DELETE /tasks/:id`
- **Access**: Private
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "id": "65d2..."
  }
}
```

---

## ⚠️ Error Responses
All error responses follow the same structure:
- **Status Codes**: `400` (Bad Request), `401` (Unauthorized), `404` (Not Found), `500` (Server Error).
```json
{
  "success": false,
  "message": "Detailed error message here",
  "stack": "Stack trace (Only in Development mode)"
}
```
