# Tamper-Evident Audit Logging System

![Node.js](https://img.shields.io/badge/Node.js-20-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)
![Tests](https://img.shields.io/badge/Tests-Passing-brightgreen)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

A production-oriented backend system for immutable audit logging using cryptographic hash chaining.

Built with:
- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Prisma ORM
- Docker

This system ensures audit logs are:
- append-only,
- tamper-evident,
- cryptographically verifiable.

---

# Features

## Core Features

- Append-only audit logging
- SHA-256 cryptographic hash chaining
- Chain integrity verification
- Single log verification
- Export logs with query filters

---

## Security Features

- API key authentication
- Rate limiting middleware
- Secure HTTP headers with Helmet
- Input validation using Zod
- Tamper detection support

---

## Production Features

- Swagger/OpenAPI documentation
- Structured logging with Pino
- Dockerized infrastructure
- PostgreSQL persistence
- Automated unit testing with Vitest
- Clean layered architecture

---

# Tech Stack

| Category | Technologies |
|---|---|
| Backend | Node.js, Express.js |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Validation | Zod |
| Documentation | Swagger/OpenAPI |
| Logging | Pino |
| Testing | Vitest |
| Infrastructure | Docker, Docker Compose |

---

# API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/log` | Create audit log |
| GET | `/api/verify` | Verify entire audit chain |
| GET | `/api/log/:id` | Verify and fetch single log |
| GET | `/api/export` | Export logs with filters |

---

# Authentication

All endpoints require the following header:

```http
x-api-key: supersecretkey
```

---

# Swagger Documentation

Available at:

```text
http://localhost:5000/api-docs
```

## Swagger UI

![Swagger](assets/swagger.png)

---

# Local Development Setup

## 1. Clone Repository

```bash
git clone <your-github-repository-url>
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/audit_log_db"

PORT=5000

API_KEY=supersecretkey
```

---

## 4. Run Prisma Migration

```bash
npx prisma migrate dev
```

---

## 5. Start Development Server

```bash
npm run dev
```

---

# Docker Setup

Run the complete application stack:

```bash
docker compose up --build
```

## Dockerized Infrastructure

![Docker](assets/docker.png)

---

# Running Tests

```bash
npm test
```

## Automated Tests

![Tests](assets/tests.png)

---

# Example Audit Log Request

```json
{
  "actor": "admin",
  "action": "CREATE_USER",
  "payload": {
    "userId": 1
  }
}
```

---

# Hash Chaining

Each audit log stores:

- `previousHash`
- `currentHash`

Any modification to historical logs breaks chain verification and becomes detectable.

## Chain Verification

![Verify](assets/verify.png)

---

# Security Considerations

- Immutable append-only architecture
- Cryptographic tamper detection
- Authenticated API access
- Request throttling
- Structured request logging
- Input validation and sanitization

---

# Project Structure

```text
src/
├── config/
├── controllers/
├── middleware/
├── routes/
├── services/
├── utils/
├── validations/
├── tests/
├── app.ts
└── server.ts
```

---

# Future Improvements

- JWT authentication
- Role-based access control
- SIEM integrations
- Cloud-native deployment pipeline
- Audit analytics dashboard

---

# Author

Shriram Dani