# Backend (minimal)

Instructions:

1. Copy `.env.example` to `.env` and set `MONGODB_URI` and `JWT_SECRET`.
2. Install dependencies:

```bash
cd backend
npm install
```

3. Run in development:

```bash
npm run dev
```

API quick reference:

- POST `/api/signup` { name, email, password }
- POST `/api/login` { email, password } -> returns `token`
- GET `/api/blogs` -> list blogs
- POST `/api/blogs` (auth) { title, content }
- PUT `/api/blogs/:id` (auth)
- DELETE `/api/blogs/:id` (auth)
