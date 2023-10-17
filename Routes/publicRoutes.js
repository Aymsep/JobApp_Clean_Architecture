const express = require('express');
const Router = express.Router();

// Import your controller functions for retrieving all jobs and a single job
const { allJobs, singleJob } = require('../Controllers/Jobs');

// Route for getting all jobs
Router.get('/alljobs', allJobs);

// Route for getting a single job by its ID
Router.get('/singlejob/:jobId', singleJob);

// Export the router for use in your application
module.exports = Router;
