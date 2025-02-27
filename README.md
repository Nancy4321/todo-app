# todo-app-service
# Todo List RESTful API

A simple RESTful API for managing todo items, built with Node.js, TypeScript, and MongoDB.

## Setup
1. Clone the repository.
2. Run `npm install`.
3. Create a `.env` file and add your MongoDB URI.
4. Run `npm run dev` to start the server.

## API Endpoints
- `POST /api/todos`: Create a new todo.
- `GET /api/todos`: Get all todos.
- `GET /api/todos/:id`: Get a single todo by ID.
- `PUT /api/todos/:id`: Update a todo by ID.
- `DELETE /api/todos/:id`: Delete a todo by ID.

## Testing
- Run unit tests: `npm run test:unit`
- Run integration tests: `npm run test:integration`
