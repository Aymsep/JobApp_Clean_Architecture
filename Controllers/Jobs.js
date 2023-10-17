// Import necessary modules and classes
const { jobsRepository } = require('../Repo/jobsRepo');
const { JobService } = require('../Services/jobsService');
const JobsSchema = require('../Modals/Jobs'); // Note: It's typically spelled as 'Models'

// Create instances of the repository and service using the provided schema
const jobsRepo = new jobsRepository(JobsSchema);
const jobsServ = new JobService(jobsRepo);

// Controller functions for handling various job-related operations
exports.addJob = async (req, res, next) => {
    // Call the 'addJob' method from the service to add a new job
    const job = await jobsServ.addJob(req);
    // Respond with the result in JSON format
    res.json(job);
    console.log('inside controllers'); // Log for debugging
};

exports.deleteJob = async (req, res, next) => {
    // Call the 'deleteJob' method from the service to delete a job
    const deletedJob = await jobsServ.deleteJob(req);
    // Respond with the result in JSON format
    res.json(deletedJob);
};

exports.mjJobs = async (req, res, next) => {
    // Call the 'myJobs' method from the service to get jobs for a user
    const jobs = await jobsServ.myJobs(req);
    // Respond with the result in JSON format
    res.json(jobs);
};

exports.allJobs = async (req, res, next) => {
    // Call the 'allJobs' method from the service to get all jobs
    const jobs = await jobsServ.allJobs(req);
    // Respond with the result in JSON format
    res.json(jobs);
};

exports.singleJob = async (req, res, next) => {
    // Call the 'singleJob' method from the service to get a specific job
    const singleJob = await jobsServ.singleJob(req);
    // Respond with the result in JSON format
    res.json(singleJob);
};

exports.updateJob = async (req, res, next) => {
    // Call the 'updateJob' method from the service to update a job
    const updatedJob = await jobsServ.updateJob(req);
    // Respond with the result in JSON format
    res.json(updatedJob);
};
