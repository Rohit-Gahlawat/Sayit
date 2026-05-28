
# Medium Clone

A full-stack blogging platform inspired by Medium, built with modern web technologies. Write, publish, and discover stories — with a clean, responsive UI and a serverless backend deployed at the edge.

## 🔗 Live Demo

> Frontend: _Coming soon (Vercel)_  
> Backend: _Coming soon_

---


## ✨ Features

- **Authentication** — Signup and signin with JWT-based auth
- **Create Blogs** — Rich text editor to write and publish stories
- **Blog Feed** — Home feed showing all published blogs with author info and read time
- **Single Blog Page** — Full article view with author sidebar and "More from Medium" suggestions
- **Input Validation** — Shared Zod schemas across frontend and backend via a custom npm package
- **Connection Pooling** — Prisma Accelerate for edge-compatible, pooled database connections
- **Fully Responsive** — Works seamlessly on mobile, tablet, and desktop

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React + TypeScript | UI framework |
| Tailwind CSS v4 | Styling |
| React Router v6 | Client-side routing |
| Axios | HTTP requests |
| Vite | Build tool |

### Backend
| Technology | Purpose |
|---|---|
| Hono | Lightweight web framework for Cloudflare Workers |
| Cloudflare Workers | Serverless edge runtime |
| Prisma ORM v7 | Type-safe database access |
| Prisma Accelerate | Connection pooling for serverless |
| Neon PostgreSQL | Serverless Postgres database |
| Zod | Input validation |
| Hono JWT | Authentication |

### Shared
| Technology | Purpose |
|---|---|
| `@night-kernel/medium-app-common` | Shared Zod schemas and TypeScript types across frontend and backend |

---

## 🏗 Architecture

```
User Request
     ↓
Cloudflare Worker (Hono)
     ↓
Prisma Client (edge-compatible, --no-engine)
     ↓
Prisma Accelerate (connection pooling)
     ↓
Neon PostgreSQL
```

Migrations run separately using a direct database URL, bypassing the connection pooler — which is required for DDL operations.

---



## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech) PostgreSQL database
- A [Prisma Accelerate](https://www.prisma.io/data-platform/accelerate) API key
- A [Cloudflare](https://cloudflare.com) account

### 1. Clone the repository

```bash
git clone https://github.com/your-username/medium-app.git
cd medium-app
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.dev.vars` file (never commit this):

```env
DATABASE_URL="your-pooled-db-connection-string"
DIRECT_DATABASE_URL="your-direct-db-connection-string"
JWT_SECRET="your_jwt_secret"
```

Run migrations and generate the Prisma client:

```bash
npx prisma migrate dev
npx prisma generate --no-engine
```

Start the dev server:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Update `src/config.ts` with your local backend URL(get it from .env in good practise):

```typescript
export const BACKEND_URL = "url-here"
```

Start the dev server:

```bash
npm run dev
```

---

## 🌍 Deployment

### Backend (Cloudflare Workers)

```bash
cd backend
npx wrangler secret put DATABASE_URL      # paste your Prisma Accelerate URL
npx wrangler secret put JWT_SECRET        # paste your JWT secret
npx wrangler deploy
```

### Frontend (Vercel)

Update `src/config.ts` with your deployed Cloudflare Worker URL before building:

```typescript
export const BACKEND_URL = "https://your-worker.your-subdomain.workers.dev/api/v1/"
```

Then deploy to Vercel via the dashboard or CLI.

---

## 🔑 Environment Variables

### Backend `.dev.vars` (local only, never commit)

### Cloudflare Production Secrets

Set via `wrangler secret put <NAME>` — only `DATABASE_URL` and `JWT_SECRET` are needed in production. `DIRECT_DATABASE_URL` is never deployed.

---

## 📦 Shared Package

The `@night-kernel/medium-app-common` package contains shared Zod validation schemas and TypeScript types used by both the frontend and backend, ensuring consistent validation across the stack.

```typescript
import { signupInputSchema, SignupType } from "@night-kernel/medium-app-common"
```

---

## 👤 Author

**Rohit Gahlawat**  
GitHub: [@Rohit-Gahlawat](https://github.com/Rohit-Gahlawat)

---

## 📄 License

MIT
