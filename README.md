# Movie Review Platform

A full-stack web application for reviewing and managing movies, built with React for the frontend and Node.js/Express for the backend.

## Features

- User authentication and authorization
- Browse and search movies
- View detailed movie information
- Submit and manage reviews
- Create and manage watchlists
- Real-time notifications
- Admin dashboard for content management
- Responsive design

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Axios for API calls
- Socket.io Client for real-time features

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Socket.io for real-time communication

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Preranahiremath1221/movie-review-platform.git
   cd movie-review-platform
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the `backend` directory
   - Add necessary environment variables (e.g., MongoDB URI, JWT secret)

5. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

6. Start the frontend:
   ```
   cd ../frontend
   npm start
   ```

The application will be available at `http://localhost:3000`

## Usage

- Register a new account or login
- Browse movies on the home page
- Click on a movie to view details and reviews
- Submit your own reviews
- Add movies to your watchlist
- Manage your profile and notifications

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

**Prerana Hiremath**
- GitHub: [Preranahiremath1221](https://github.com/Preranahiremath1221)

## License

This project is licensed under the ISC License.
