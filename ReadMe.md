# User Authentication API

This project is a user authentication API built using Node.js, Express, and MongoDB. It allows users to register, log in, and retrieve their profiles, with authentication and validation features.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Middleware](#middleware)
- [Models](#models)
- [Controllers](#controllers)
- [Validators](#validators)
- [Database](#database)
- [Environment Variables](#environment-variables)
- [Usage](#usage)

## Getting Started

### Prerequisites

Before running the project, make sure you have the following installed:

- Node.js
- MongoDB
- npm or yarn
- Git (optional)

### Installing

1. Clone the repository:

   ```bash
   git clone https://github.com/Taiwo17/Auth_User.git
   ```

2. Change to the project directory:

   `cd auth_tech_writing`

3. Install dependencies:

```npm install

4. Set up environment variables by creating a .env file in the project root and define the following variables:

```

    PORT=4000
    DB_ONLINE_URI=your-mongodb-uri
    ```

5. Start the server:

   `npm start`

## Project Structure

The project is structured as follows:

- **controllers/**: Contains the route handling logic.
- **middleware/**: Includes middleware functions for authentication.
- **models/**: Defines the data models for MongoDB.
- **routes/**: Defines API routes and endpoints.
- **validators/**: Includes data validation schemas using Joi.
- **config/**: Contains database configuration.
- **server.js**: The main entry point of the application.

## API Endpoints

- **POST /api/v1/register**: Register a new user.
- **POST /api/v1/login**: Log in an existing user.
- **GET /api/v1/me**: Retrieve user profile (requires authentication).

## Middleware

- **isAuthenticated**: Middleware to verify user authentication.

## Models

- **User**: Defines the user data model.

## Controllers

- **user.controller.js**: Contains the logic for user registration, login, and profile retrieval.

## Validators

- **user.validator.js**: Validates user registration and login data using Joi schemas.

## Database

- MongoDB is used as the database. Make sure to set up the MongoDB connection in the `.env` file.

## Environment Variables

- **PORT**: Port the server listens on.
- **DB_ONLINE_URI**: MongoDB connection URI.

## Usage

- Register a new user by making a POST request to `/api/v1/register`.
- Log in with an existing user by making a POST request to `/api/v1/login`.
- Retrieve the user's profile by making a GET request to `/api/v1/me` (requires authentication).
