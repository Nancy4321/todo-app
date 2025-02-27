# Todo List RESTful API

This is a simple RESTful API built with Node.js, TypeScript, and MongoDB to manage a list of todo items. It provides endpoints to create, retrieve, update, and delete todo items.



## Features
- **Create Todo**: Add a new todo list with a title, optional description, and status.
- **Retrieve Todos**: Fetch all todo lists or a single todo by its ID.
- **Update Todo**: Modify an existing todo list (e.g., update title, description, or status).
- **Delete Todo**: Remove a todo list by its ID.

## Tech Stack
- **Backend**: Node.js with TypeScript
- **Database**: MongoDB
- **Testing**: Jest (for unit and integration tests)
- **API Documentation**: Swagger
- **Logging**: Winston
- **Validation**: Zod

## Setup Instructions
### Clone the repository:
```bash
git clone https://github.com/your-repo/todo-api.git
cd todo-api
```
### Install dependencies:
```bash
npm install
```
### Set up environment variables:
Create a `.env` file in the root directory and add the following:
```
MONGODB_URI=mongodb://localhost:27017/todo_db
PORT=3000
```
### Start MongoDB:
Ensure MongoDB is running locally or update the `MONGODB_URI` in the `.env` file to point to your MongoDB instance.

## Running the Application
### Start the server:
```bash
npm run dev
```
### Access the API:
- The API will be available at [http://localhost:3000/api](http://localhost:3000/api).
- Swagger documentation will be available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## API Documentation
The API is documented using Swagger. You can access the Swagger UI at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## Example Requests
### Create a Todo
```http
POST /api/todos
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "status": "pending"
}
```
### Get All Todos
```http
GET /api/todos
```
### Get a Single Todo
```http
GET /api/todos/:id
```
### Update a Todo
```http
PUT /api/todos/:id
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread, butter",
  "status": "complete"
}
```
### Delete a Todo
```http
DELETE /api/todos/:id
```

## Testing
### Unit Tests
Unit tests are written for the service layer and utility functions using Jest.
#### Run unit tests:
```bash
npm run test:unit
```
### Integration Tests
Integration tests are written for the API endpoints using Jest and Supertest.
#### Run integration tests:
```bash
npm run test:integration
```

## Assumptions and Design Decisions
### Data Model:
Each todo list has the following fields:
- **_id**: Auto-generated unique identifier (MongoDB ObjectId).
- **title**: Required string.
- **description**: Optional string.
- **status**: Enum with values `pending` or `complete` (default: `pending`).
- **createdAt** and **updatedAt**: Auto-generated timestamps.

### Validation:
- The `title` field is required.
- The `status` field is validated to ensure it is either `pending` or `complete`.

### Error Handling:
- Custom error responses are returned for invalid requests, non-existent resources, and server errors.

### Testing Strategy:
- **Unit Tests**: Focus on individual functions (e.g., service layer, validation).
- **Integration Tests**: Focus on API endpoints and interactions with the database.

### Database:
- MongoDB is used for persistence. For testing, the database is mocked using Jest.

## Error Handling
The API handles the following errors:
- **400 Bad Request**: Invalid input data (e.g., missing title).
- **404 Not Found**: Requested resource (e.g., todo list) does not exist.
- **500 Internal Server Error**: Unexpected server errors.

## Future Improvements
- **Pagination**: Add pagination for the `GET /api/todos` endpoint.
- **Authentication**: Add user authentication and authorization.
- **Advanced Filtering**: Allow filtering todos by status, date, etc.
- **Logging**: Add file-based logging for production environments.
- **Dockerization**: Provide a Docker setup for easier deployment.


