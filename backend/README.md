# FlagOps Backend

Backend API for FlagOps built with Express, TypeScript, and Drizzle ORM.

## Tech Stack

- **Express** - Web framework
- **TypeScript** - Type safety
- **Drizzle ORM** - Database ORM
- **Neon Database** - Serverless PostgreSQL
- **Zod** - Schema validation
- **Bcrypt** - Password hashing
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
│   ├── routes/          # API routes
│   ├── db/              # Database configuration
│   │   └── schema/      # Database schemas
│   ├── types/           # TypeScript types
│   └── index.ts         # Entry point
├── drizzle/             # Generated migrations
├── .env                 # Environment variables
└── drizzle.config.ts    # Drizzle configuration
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user

## Dependencies

### Production
- `express` - Web framework
- `@neondatabase/serverless` - Neon database client
- `drizzle-orm` - TypeScript ORM
- `dotenv` - Environment variables
- `bcrypt` - Password hashing
- `cors` - CORS middleware
- `zod` - Schema validation

### Development
- `typescript` - TypeScript compiler
- `tsx` - TypeScript execution with hot reload
- `drizzle-kit` - Database migration tool
- `@types/*` - TypeScript type definitions

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
npm install express dotenv cors bcrypt zod drizzle-orm @neondatabase/serverless

# Development dependencies
npm install -D typescript tsx @types/node @types/express @types/cors @types/bcrypt drizzle-kit
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

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### 8. Define Database Schema
Create `src/db/schema/app.ts`:
```typescript
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
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
