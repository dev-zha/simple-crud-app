# Simple CRUD App (Frontend)

This is a frontend project built with React for interacting with a RESTful API created with Express.js.

## Features

- Fetch and display all posts from the backend.
- User authentication with login and registration forms.
- Create new posts after logging in.
- View post details with options to edit and delete for the author.
- Edit existing posts.

## Prerequisites

- Node.js installed on your machine.
- The backend server with Express.js set up and running.

## Getting Started

1. Install dependencies:

```
npm install
```

2. Set up environment variables:

If your backend server is running on a different port or domain, update the `API_URL` in the constant file (`src/constants/index.ts`).
Ensure that the backend server is configured to handle JWT token authorization. 3. Start the development server:

```
npm start
```

Access the application at http://localhost:5173.

## Using shadcn/ui

This project utilizes the `shadcn/ui` library for UI components. You can find more information and usage examples in the [shadcn/ui documentation](https://ui.shadcn.com/docs/).
