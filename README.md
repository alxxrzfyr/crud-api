# Task API

> **FlyRank Internship — Backend Track (Week 2 · Assignment A1)**
> A RESTful API built using **Node.js** and **Express.js** to manage an in-memory to-do list with Swagger UI documentation.

## Features

- Full **CRUD** operations for tasks (`GET`, `POST`, `PUT`, `DELETE`).
- In-memory data storage (resets on server restart).
- Input validation & clear HTTP status codes (`200`, `201`, `204`, `400`, `404`).
- Interactive API documentation powered by **Swagger UI**.
- Ultra-optimized performance ($O(1)$ Map store & pre-serialized responses).

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (installed automatically with Node.js)

### Installation & Running

1. Navigate to the project directory:
   ```bash
   cd task-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   - **Single process mode**:
     ```bash
     npm start
     ```
   - **Multi-core cluster mode** (maximum performance):
     ```bash
     npm run start:cluster
     ```

   The server runs at `http://localhost:3000`.

---

## API Documentation (Swagger UI)

Interactive API documentation is available via **Swagger UI** at:

```
http://localhost:3000/docs
```

---

## Endpoints Summary

| Method | Endpoint | Description | Expected Status |
| ------ | -------- | ----------- | --------------- |
| `GET` | `/` | Root endpoint with API details | `200 OK` |
| `GET` | `/health` | Health check endpoint | `200 OK` |
| `GET` | `/tasks` | Retrieve all tasks | `200 OK` |
| `GET` | `/tasks/:id` | Retrieve a specific task by ID | `200 OK` / `404 Not Found` |
| `POST` | `/tasks` | Create a new task | `201 Created` / `400 Bad Request` |
| `PUT` | `/tasks/:id` | Update an existing task | `200 OK` / `400 Bad Request` / `404 Not Found` |
| `DELETE` | `/tasks/:id` | Delete a task by ID | `204 No Content` / `404 Not Found` |

---

## Sample Request & Response (`curl -i`)

```bash
$ curl -i http://localhost:3000/tasks
```

**Output:**
```http
HTTP/1.1 200 OK
Content-Type: application/json
Date: Sat, 18 Jul 2026 07:33:05 GMT
Connection: keep-alive
Keep-Alive: timeout=65
Transfer-Encoding: chunked

[
  {"id":1,"title":"Learn Express","done":false},
  {"id":2,"title":"Build CRUD API","done":true},
  {"id":3,"title":"Write README","done":false}
]
```

---

## Sample Requests (`curl`)

### 1. Get Root Endpoint
```bash
curl http://localhost:3000/
```

### 2. Check Server Health
```bash
curl http://localhost:3000/health
```

### 3. Get All Tasks
```bash
curl http://localhost:3000/tasks
```

### 4. Get Task by ID
```bash
curl http://localhost:3000/tasks/1
```

### 5. Create a New Task
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy milk"}'
```

### 6. Update Task
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "done": true}'
```

### 7. Delete Task
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

---

## License

MIT
