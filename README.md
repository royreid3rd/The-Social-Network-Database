# Project Name

## Description

This project is a simple API server built using Node.js, Express.js, and MongoDB. It provides endpoints for managing thoughts and reactions, as well as friend management.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository to your local machine.
2. Install Node.js and MongoDB if you haven't already.
3. Navigate to the project directory and run `npm install` to install dependencies.

## Usage

1. Start MongoDB on your local machine.
2. Run `npm start` to start the server.
3. Use an API testing tool like Insomnia to test.

## Endpoints

### Thoughts

- **GET /api/thoughts**: Get all thoughts.
- **GET /api/thoughts/:id**: Get a single thought by ID.
- **POST /api/thoughts**: Create a new thought.
    - Request Body:
        ```json
        {
          "thoughtText": "Here's a new thought...",
          "username": "example_user",
          "userId": "611bc312c1c29e001e8a3c63"
        }
        ```
- **PUT /api/thoughts/:id**: Update a thought by ID.
- **DELETE /api/thoughts/:id**: Delete a thought by ID.

### Reactions

- **POST /api/thoughts/:thoughtId/reactions**: Add a reaction to a thought.
    - Request Body:
        ```json
        {
          "reactionBody": "Wow, interesting thought!",
          "username": "another_user"
        }
        ```
- **DELETE /api/thoughts/:thoughtId/reactions/:reactionId**: Delete a reaction from a thought.

### Users

- **GET /api/users**: Get all users.
- **GET /api/users/:id**: Get a single user by ID.
- **POST /api/users**: Create a new user.
- **PUT /api/users/:id**: Update a user by ID.
- **DELETE /api/users/:id**: Delete a user by ID.

### Friends

- **POST /api/users/:userId/friends/:friendId**: Add a friend to a user's friend list.
- **DELETE /api/users/:userId/friends/:friendId**: Remove a friend from a user's friend list.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT) for authentication


## License

This project is licensed under the [MIT License](LICENSE).
