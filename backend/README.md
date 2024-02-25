# Simple CRUD App

This is a boilerplate project for building a RESTful API using Express.js with Prisma ORM for MySQL database and JWT-based authentication.

## Features

- User registration and login with password hashing using bcrypt.
- JWT (JSON Web Tokens) authentication.
- CRUD operations for managing posts with authorization.
- Input validation using Zod.
- Separation of concerns with controllers, routes, and middleware.
- Error handling for better response management.

## Prerequisites

- Node.js installed on your machine.
- MySQL database set up.

## Getting Started

1. Install dependencies:

```
npm install
```

2. Set up the environment variables:

Copy the `.env.example` file to `.env`:

```
cp .env.example .env
```

Open the `.env` file and fill in the required values

3. Run database migrations:

```
npx prisma migrate dev
```

4. Generate Prisma client:

```
npx prisma migrate dev
```

5. Start the server:

```
npm start
```

Access the API at http://localhost:3000.

## API Endpoints

`POST /api/auth/register:` Register a new user.
`POST /api/auth/login`: Login user and generate JWT token.
`GET /api/posts`: Fetch all posts.
`GET /api/posts/:id`: Fetch a single post by ID.
`POST /api/posts`: Create a new post (requires authentication).
`PUT /api/posts/:id`: Update a post by ID (requires authentication and ownership).
`DELETE /api/posts/:id`: Delete a post by ID (requires authentication and ownership).
