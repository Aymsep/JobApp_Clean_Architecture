const express = require('express');
const Router = express.Router();

// Import your controller functions for handling job operations
const { addJob, deleteJob, mjJobs, updateJob } = require('../Controllers/Jobs');

// Import your custom middleware functions
const { TokenCheck } = require('../Middlewares/TokenCheck');
const { authorizeJobAction } = require('../Middlewares/authorizeJobAction');

// Use the TokenCheck middleware for all routes in this router
Router.use(TokenCheck);

// Define routes for adding a job, updating a job, deleting a job, and getting "my jobs"
Router.post('/addJob', addJob); // Route for adding a job

// Route for updating a job. Use the authorizeJobAction middleware for authorization.
Router.patch('/updatejob/:jobId', authorizeJobAction, updateJob);

// Route for deleting a job. Use the authorizeJobAction middleware for authorization.
Router.delete('/deleteJob/:jobId', authorizeJobAction, deleteJob);

// Route for getting "my jobs"
Router.get('/myjobs', mjJobs);

// Export the router for use in your application
module.exports = Router;
