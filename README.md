# CRUD API

This project implements a simple CRUD API for managing user records using an in-memory database. The API is built with Node.js and Express, and it supports various operations such as creating, reading, updating, and deleting user data.

## Features

- **User Management**: Create, read, update, and delete user records.
- **In-Memory Database**: All user data is stored in memory for quick access.
- **Error Handling**: Proper error responses for invalid requests and server errors.
- **UUID Validation**: Ensures that user IDs are valid UUIDs.
- **Horizontal Scaling**: Supports multiple instances of the application using Node.js Cluster API.

## API Endpoints

### Users

- **GET** `/api/users`  
  Retrieve all users.  
  **Response**: 200 OK with an array of user records.

- **GET** `/api/users/{userId}`  
  Retrieve a user by ID.  
  **Response**:  
  - 200 OK with the user record if found.  
  - 400 Bad Request if `userId` is invalid.  
  - 404 Not Found if the user does not exist.

- **POST** `/api/users`  
  Create a new user.  
  **Request Body**: Must include `username`, `age`, and `hobbies`.  
  **Response**:  
  - 201 Created with the newly created user record.  
  - 400 Bad Request if required fields are missing.

- **PUT** `/api/users/{userId}`  
  Update an existing user.  
  **Request Body**: Must include fields to update.  
  **Response**:  
  - 200 OK with the updated user record.  
  - 400 Bad Request if `userId` is invalid.  
  - 404 Not Found if the user does not exist.

- **DELETE** `/api/users/{userId}`  
  Delete a user by ID.  
  **Response**:  
  - 204 No Content if the user is successfully deleted.  
  - 400 Bad Request if `userId` is invalid.  
  - 404 Not Found if the user does not exist.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` and set the desired port number PORT=4000.

4. Start the application in development mode:
   ```
   npm run dev
   ```

5. For production mode, build and start the application:
   ```
   npm run start:prod
   ```

6. To run multiple instances with load balancing:
   ```
   npm run start:multi
   ```

## Testing

The project includes tests for the API endpoints. To run the tests, use:
```
npm test
```

## License

This project is licensed under the MIT License.