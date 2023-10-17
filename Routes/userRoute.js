const express = require('express');
const Router = express.Router();

// Import your controller functions for user registration, login, and profile
const { Register, Login, Profile } = require('../Controllers/User');

// Import the TokenCheck middleware for authentication
const { TokenCheck } = require('../Middlewares/TokenCheck');
const { userValidator } = require('../Middlewares/Sanitize');

// Route for user registration
Router.post('/register',userValidator, Register);

// Route for user login
Router.post('/login',userValidator, Login);

// Route for accessing the user's profile. Requires authentication using the TokenCheck middleware.
Router.get('/profile', TokenCheck, Profile);

// Export the router for use in your application
module.exports = Router;
