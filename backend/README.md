# FlagOps Backend

A feature flag management system backend API built with Express, TypeScript, and Drizzle ORM. Manage feature flags across multiple environments with role-based access control and deterministic rollout strategies.

## Features

- **Feature Flag Management** - Create, read, update, and delete feature flags
- **Multi-Environment Support** - Manage flags across development, staging, and production
- **Deterministic Rollout** - Gradual feature rollout with percentage-based targeting
- **JWT Authentication** - Secure cookie-based authentication
- **Role-Based Access Control** - Admin-only flag management operations
- **Request Validation** - Zod schema validation for all endpoints
- **Password Security** - Bcrypt password hashing

## Tech Stack

- **Express** - Web framework
- **TypeScript** - Type safety
- **Drizzle ORM** - Database ORM
- **Neon Database** - Serverless PostgreSQL
- **Zod** - Schema validation
- **Bcrypt** - Password hashing
- **JWT** - Token-based authentication
- **Cookie Parser** - Cookie handling
- **CORS** - Cross-origin resource sharing

## Prerequisites

- Node.js (v20+)
- npm or yarn
- Neon Database account

## Setup

1. **Install dependencies**
```bash
npm install
```

2. **Environment variables**

Create a `.env` file in the backend directory:
```env
DATABASE_URL=your_neon_database_url
PORT=8000
JWT_SECRET_KEY=your_jwt_secret_key
NODE_ENV=production
JWT_EXPIRES_IN=1h
```

3. **Generate database migrations**
```bash
npm run db:generate
```

4. **Run migrations**
```bash
npm run db:migrate
```

## Development

Start the development server with hot reload:
```bash
npm run dev
```

Server runs on `http://localhost:8000`

## Production

Build the project:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production server
- `npm run db:generate` - Generate database migrations from schema
- `npm run db:migrate` - Apply migrations to database

## Project Structure

```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   │   ├── auth.controller.ts
│   │   ├── flags.controller.ts
│   │   └── evaluate.controller.ts
│   ├── routes/          # API routes
│   │   ├── auth.routes.ts
│   │   ├── flags.routes.ts
│   │   └── evaluate.routes.ts
│   ├── middlewares/     # Custom middlewares
│   │   ├── auth.ts      # JWT authentication
│   │   ├── checkRole.ts # Role-based access control
│   │   └── validate.ts  # Request validation
│   ├── schemas/         # Zod validation schemas
│   │   ├── userSchema.ts
│   │   ├── flagsSchema.ts
│   │   └── evaluateSchema.ts
│   ├── db/              # Database configuration
│   │   ├── schema/      # Database schemas
│   │   └── index.ts
│   ├── utils/           # Utility functions
│   │   └── generateToken.ts
│   ├── types/           # TypeScript types
│   └── index.ts         # Entry point
├── drizzle/             # Generated migrations
├── .env                 # Environment variables
└── drizzle.config.ts    # Drizzle configuration
```

## API Endpoints

### Authentication
- `POST /v1/api/auth/register` - Register new user
- `POST /v1/api/auth/login` - Login user (returns JWT in cookie)
- `POST /v1/api/auth/logout` - Logout user

### Feature Flags (Admin Only)
- `GET /v1/api/flags` - Get all feature flags (authenticated)
- `GET /v1/api/flags/:id` - Get flag by ID (authenticated)
- `POST /v1/api/flags` - Create new flag (admin only)
- `PUT /v1/api/flags/:id` - Update flag (admin only)
- `DELETE /v1/api/flags/:id` - Delete flag (admin only)

### Flag Evaluation
- `GET /v1/api/evaluate?flag=<name>&environment=<env>` - Evaluate if flag is enabled for user

## Dependencies

### Production
- `express` - Web framework
- `@neondatabase/serverless` - Neon database client
- `drizzle-orm` - TypeScript ORM
- `dotenv` - Environment variables
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT authentication
- `cookie-parser` - Cookie parsing
- `cors` - CORS middleware
- `zod` - Schema validation

### Development
- `typescript` - TypeScript compiler
- `tsx` - TypeScript execution with hot reload
- `drizzle-kit` - Database migration tool
- `@types/*` - TypeScript type definitions (express, bcrypt, cors, jsonwebtoken, cookie-parser, node)

---

## Starting From Scratch

If you want to create a similar project from scratch:

### 1. Initialize Project
```bash
mkdir backend && cd backend
npm init -y
```

### 2. Install Dependencies
```bash
# Production dependencies
npm install express dotenv cors bcrypt jsonwebtoken cookie-parser zod drizzle-orm @neondatabase/serverless

# Development dependencies
npm install -D typescript tsx @types/node @types/express @types/cors @types/bcrypt @types/jsonwebtoken @types/cookie-parser drizzle-kit
```

### 3. Setup TypeScript
```bash
npx tsc --init
```

Update `tsconfig.json`:
```json
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler",
    "target": "esnext",
    "types": ["node"],
    "sourceMap": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

### 4. Update package.json
Add `"type": "module"` and scripts:
```json
{
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate"
  }
}
```

### 5. Create Project Structure
```bash
mkdir -p src/controllers src/routes src/db/schema
touch src/index.ts .env drizzle.config.ts
```

### 6. Setup Database Config
Create `drizzle.config.ts`:
```typescript
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

### 7. Create Basic Server
Create `src/index.ts`:
```typescript
import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### 8. Define Database Schema
Create `src/db/schema/app.ts`:
```typescript
import { pgTable, text, timestamp, uuid, unique, boolean, integer, index } from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
};

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull(),
  ...timestamps,
});

export const flags = pgTable(
  "flags",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    environment: text("environment", { enum: ["development", "staging", "production"] }).notNull(),
    defaultState: boolean("default_state").notNull(),
    rolloutPercentage: integer("rollout_percentage").default(0).notNull(),
    createdBy: uuid("created_by").notNull().references(() => users.id),
    ...timestamps,
  },
  (t) => [unique().on(t.name, t.environment), index().on(t.environment)],
);
```

### 9. Setup Database Connection
Create `src/db/index.ts`:
```typescript
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);
```

### 10. Generate and Run Migrations
```bash
npm run db:generate
npm run db:migrate
```

### 11. Start Development
```bash
npm run dev
```
