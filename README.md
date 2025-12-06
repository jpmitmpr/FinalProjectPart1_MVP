Final Project Part 1 – MVP REST API
Project Overview

This project is a RESTful API built with Node.js, Express, Sequelize, and SQLite.
It represents the MVP (Minimum Viable Product) for the final project. The API manages three related resources: Users, Posts, and Comments, each with full CRUD functionality.

The project includes database setup, seed data, middleware, error handling, unit testing with Jest, and Postman documentation.

Technologies Used

Node.js

Express

Sequelize ORM

SQLite

Jest & Supertest

Postman

Nodemon

dotenv

Project Structure
src/
├── app.js
├── server.js
├── controllers/
├── routes/
├── models/
├── middleware/
tests/
scripts/
.env

Database Schema

The database contains three relational models:

User

id

name (required)

email (required, unique)

Post

id

title

content

userId (foreign key)

Comment

id

content

userId (foreign key)

postId (foreign key)

Relationships

A User has many Posts

A User has many Comments

A Post has many Comments

Setup Instructions
1. Install Dependencies
npm install

2. Initialize Database
npm run setup-db

3. Seed Database (Optional)
npm run seed

4. Start Server
npm start


Server runs at:

http://localhost:3000

Running Tests

This project uses Jest and Supertest for testing.

npm test


All tests:

Run independently

Use a test environment

Do not affect the development database

API Endpoints
Users

Create User

POST /api/users


Body:

{
  "name": "Alice",
  "email": "alice@example.com"
}


Get All Users

GET /api/users


Get User by ID

GET /api/users/:id


Update User

PUT /api/users/:id


Body:

{
  "name": "Updated Name"
}


Delete User

DELETE /api/users/:id

Posts

Create Post

POST /api/posts


Body:

{
  "title": "My First Post",
  "content": "Post content",
  "userId": 1
}


Get All Posts

GET /api/posts

Comments

Create Comment

POST /api/comments


Body:

{
  "content": "Nice post!",
  "userId": 1,
  "postId": 1
}

Middleware

express.json() for JSON request parsing

Custom logging middleware

Centralized error-handling middleware

Error Handling

The API returns appropriate HTTP status codes:

400 – Bad Request

404 – Not Found

500 – Internal Server Error

Error responses are returned in JSON format.

Postman API Documentation

A public Postman collection documents all CRUD endpoints, including example requests and responses.

✅ Public Postman Documentation Link
https://jpmitmpr-904510.postman.co/workspace/Juan-Morales's-Workspace~f85e8ddc-e4e2-41e6-820c-ac89160c9244/folder/49905253-aa5eed26-2acc-4fb5-8b52-be153fc6dbef?action=share&source=copy-link&creator=49905253&ctx=documentation
