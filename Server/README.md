# Habit Nation Backend

This is the backend server for the Habit Nation application, providing APIs for user authentication, habit tracking, and achievement management.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/habit-nation
JWT_SECRET=your-super-secret-key-here
NODE_ENV=development
```

3. Start the development server:
```bash
npm run dev
```

## API Documentation

### Authentication

#### Register
- **POST** `/api/auth/register`
- Request body:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### Login
- **POST** `/api/auth/login`
- Request body:
```json
{
  "email": "string",
  "password": "string"
}
```

### Habits

#### Get All Habits
- **GET** `/api/habits`
- Requires authentication

#### Create Habit
- **POST** `/api/habits`
- Requires authentication
- Request body:
```json
{
  "name": "string",
  "description": "string",
  "frequency": "daily|weekly|monthly",
  "schedule": ["monday", "wednesday", "friday"],
  "timeOfDay": "morning|afternoon|evening",
  "xpValue": number
}
```

#### Update Habit
- **PUT** `/api/habits/:id`
- Requires authentication
- Request body: Same as create

#### Delete Habit
- **DELETE** `/api/habits/:id`
- Requires authentication

#### Mark Habit as Completed
- **POST** `/api/habits/:id/complete`
- Requires authentication

### Achievements

#### Get All Achievements
- **GET** `/api/achievements`
- Requires authentication

#### Get User's Achievements
- **GET** `/api/achievements/user`
- Requires authentication

#### Check for New Achievements
- **POST** `/api/achievements/check`
- Requires authentication

### User Profile

#### Get Current User
- **GET** `/api/users/me`
- Requires authentication

#### Update Profile
- **PUT** `/api/users/me`
- Requires authentication
- Request body:
```json
{
  "username": "string",
  "email": "string"
}
```

#### Update Password
- **PUT** `/api/users/me/password`
- Requires authentication
- Request body:
```json
{
  "currentPassword": "string",
  "newPassword": "string"
}
```

#### Get User Stats
- **GET** `/api/users/me/stats`
- Requires authentication

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Error responses include a message and optional error details:
```json
{
  "message": "Error message",
  "error": "Error details (in development)"
}
```

## Development

To start the development server with hot reloading:
```bash
npm run dev
```

To run tests:
```bash
npm test
```

## Production

To build for production:
```bash
npm run build
```

To start the production server:
```bash
npm start
``` 