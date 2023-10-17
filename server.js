// Import required modules and create an Express app
const express = require('express');
const app = express();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');



// Import the database connection function and execute it
const { connection } = require('./Config/database');
const database = connection();

// Use helmet middleware for enhanced security
app.use(helmet());

// Load environment variables from a .env file
require('dotenv').config();

// Middleware setup
app.use(express.json()); // Enable JSON request body parsing
app.use(express.urlencoded({ extended: true })); // Enable URL-encoded request body parsing


// Define the rate limit configuration
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Rate limit exceeded. Please try again later.',
});

app.use(apiLimiter);


// Import and use routers for user, jobs, and public routes
const userRouter = require('./Routes/userRoute');
const jobsRoutes = require('./Routes/jobsRoutes');
const publicRoutes = require('./Routes/publicRoutes');

app.use('/', publicRoutes); // Use public routes
app.use('/', userRouter); // Use user routes
app.use('/', jobsRoutes); // Use job-related routes

// Connect to the MongoDB database
database.connectToMongo();


app.use((err, req, res, next) => {
    // Handle errors and respond accordingly
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

// Start the Express server and listen on port 5000
app.listen(5000, () => {
    console.log('Listening on port 5000');
});
