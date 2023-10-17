// Import necessary modules
const { body, validationResult } = require('express-validator');

// Define a user input validation middleware
const userValidator = [
  // Validate the 'username' field
  body('name')
    .isString()
    .notEmpty()
    .withMessage('Name is required'),

  // Validate the 'email' field
  body('email')
    .isString()
    .isEmail()
    .withMessage('Valid email is required'),

  // Validate the 'password' field (optional)
  body('password')
    .isString()
    .optional(), // Password is optional; no validation message specified

  // Custom validation middleware
  (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);

    // If there are validation errors, return a 400 (Bad Request) response with error details
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If there are no errors, continue to the next middleware
    next();
  },
];

// Export the userValidator middleware for use in routes
module.exports = { userValidator };
