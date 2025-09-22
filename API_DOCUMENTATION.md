# HexamGen API Documentation

This document provides automatically generated documentation for the HexamGen API endpoints.

---

## Analytics API

**Prefix:** `/analytics`

### GET /

- **Description:** Retrieves analytics data.
- **Response:**
  ```json
  {
    "message": "Analytics routes placeholder"
  }
  ```

### GET /report

- **Description:** Generates and retrieves an analytics report.
- **Response:**
  ```json
  {
    "message": "Analytics report placeholder"
  }
  ```

---

## Auth API

**Prefix:** `/auth`

### POST /register

- **Description:** Registers a new user in the system.
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response (Success - 200):**
  ```json
  {
    "id": "integer",
    "username": "string",
    "email": "string"
  }
  ```
- **Response (Error - 400):**
  ```json
  {
    "detail": "Username already exists"
  }
  ```

---

## Leaderboard API

**Prefix:** `/leaderboard`

### GET /

- **Description:** Retrieves the current leaderboard standings.
- **Response:**
  ```json
  {
    "message": "Leaderboard routes placeholder"
  }
  ```

### POST /update

- **Description:** Updates the leaderboard with new scores.
- **Response:**
  ```json
  {
    "message": "Update leaderboard placeholder"
  }
  ```

---

## PYQ (Previous Year Questions) API

**Prefix:** `/pyq`

### GET /

- **Description:** Retrieves a list of previous year questions.
- **Response:**
  ```json
  {
    "message": "PYQ routes placeholder"
  }
  ```

---

## Quiz API

**Prefix:** `/quiz`

### GET /

- **Description:** Retrieves a list of available quizzes.
- **Response:**
  ```json
  {
    "message": "Quiz routes placeholder"
  }
  ```

### POST /

- **Description:** Creates a new quiz.
- **Response:**
  ```json
  {
    "message": "Create quiz placeholder"
  }
  ```

---

## Timetable API

**Prefix:** `/timetable`

### GET /

- **Description:** Retrieves the user's timetable.
- **Response:**
  ```json
  {
    "message": "Timetable routes placeholder"
  }
  ```

### POST /

- **Description:** Creates or updates a timetable.
- **Response:**
  ```json
  {
    "message": "Create timetable placeholder"
  }
  ```
