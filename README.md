# Library Management System

A simple Library Management System built with Express.js and Sequelize for managing users, books, borrowing, and ratings. The system allows users to borrow and return books, as well as rate books they've read.

## Features

- **User Management**: Create, get, and manage users.
- **Book Management**: Create and get book details.
- **Borrowing**: Users can borrow and return books.
- **Ratings**: Users can rate books they've borrowed, and the average score of a book is updated.

## Requirements

- Node.js (version 16 or later)
- Docker (for easy setup of services like PostgreSQL)

## Setup Instructions

### 1. Build and Run with Docker

This project uses Docker to set up the necessary services.
#### Build and start the containers
In the project root directory, run the following command to build and start the Docker containers:

```bash
docker-compose up --build
```
This will start the following services:

- **db**: PostgreSQL database
- **api**: NodeJS application

### Access the API
Once the containers are up and running, the NodeJS application will be available at:
```bash
http://localhost:3000
```

## API Endpoints
### User Routes
- `POST /users` : Create a new user.
- `GET /users` : Get all users.
- `GET /users/:id` : Get a user with their borrowed books.
### Book Routes
- `POST /books` : Add a new book.
- `GET /books` : Get all books.
- `GET /books/:id` : Get details of a single book.
### Borrow Routes
- `POST /users/:userId/borrow/:bookId` : Borrow a book for a user.
- `POST /users/:userId/return/:bookId` : Return a borrowed book and optionally provide a rating.

### Stop the Docker Containers
To stop the containers, use the following command:
```bash
docker-compose down
```