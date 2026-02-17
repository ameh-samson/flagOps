# FlagOps

A feature flag management system for controlling feature rollouts across multiple environments with role-based access control.

## Features

- Feature flag management with CRUD operations
- Multi-environment support (development, staging, production)
- Deterministic percentage-based rollout
- JWT authentication with role-based access control
- Real-time flag evaluation

## Tech Stack

**Backend**

- Express + TypeScript
- Drizzle ORM + Neon PostgreSQL
- JWT + Bcrypt
- Zod validation

**Frontend**

- React + TypeScript
- Vite
- Tailwind CSS

## Project Structure

```
flagOps/
├── backend/     # Express API server
└── frontend/    # React web application
```

## Quick Start

### Backend

```bash
cd backend
npm install
npm run dev
```

See [backend/README.md](backend/README.md) for details.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

See [frontend/README.md](frontend/README.md) for details.

## Environment Variables

**Backend** (`.env`)

```env
DATABASE_URL=your_neon_database_url
PORT=8000
JWT_SECRET_KEY=your_jwt_secret_key
NODE_ENV
JWT_EXPIRES_IN
```

**Frontend** (`.env`)

```env
VITE_API_URL=http://localhost:8000
```

## API Overview

- `POST /v1/api/auth/register` - User registration
- `POST /v1/api/auth/login` - User login
- `GET /v1/api/flags` - List all flags
- `POST /v1/api/flags` - Create flag (admin)
- `GET /v1/api/evaluate` - Evaluate flag state
