const CONSTANTS = require('../Config/constants'); // Import constants

class JobService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  // Method for adding a new job
  async addJob(req) {
    const response = {};
    const { title, longDescription, shortDescription, type, minSalary, maxSalary, country, city, image } = req.body;


    // Check if required fields are empty
    const fieldsToCheck = [title, longDescription, shortDescription, type, minSalary, maxSalary, country, city, image];

    if (fieldsToCheck.some((field) => !field || (typeof field === 'string' && field.trim() === ''))){
      response.message = CONSTANTS.FIELD_EMPTY;
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
      return response;
    }

    // Create a new job object with user ID and job details
    const newJob = { userId: req.userid, title, longDescription, shortDescription, type, minSalary, maxSalary, country, city, image };


    // Call the repository's method to add the job
    const job = await this.userRepo.addJob(newJob);

    if (!job) {
      response.message = CONSTANTS.JOB_CREATION_FAILED;
      response.status = CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE;
      return response;
    }

    response.message = CONSTANTS.JOB_CREATED;
    response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
    response.data = job;
    return response;
  }

  // Method for deleting a job
  async deleteJob(req) {
    const response = {};
    const { jobId } = req.params;

    // Call the repository's method to delete the job
    const deletedJob = await this.userRepo.deleteJob(jobId);

    if (deletedJob.deletedCount === 0) {
      response.message = CONSTANTS.JOB_DELETE_FAILED;
      response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
      return response;
    }

    response.message = CONSTANTS.JOB_DELETED;
    response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
    response.data = deletedJob;
    return response;
  }

  // Method for retrieving a user's jobs
  async myJobs(req) {
    const response = {};
    const { userid } = req;

    // Call the repository's method to retrieve the user's jobs
    const jobs = await this.userRepo.myJobs(userid);

    if (!jobs) {
      response.message = CONSTANTS.JOB_NOT_FOUND;
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
      return response;
    }

    response.message = CONSTANTS.JOB_FOUND;
    response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
    response.data = jobs;
    return response;
  }

  // Method for retrieving all jobs
  async allJobs(req) {
    const response = {};

    // Call the repository's method to retrieve all jobs
    const jobs = await this.userRepo.allJobs();

    if (!jobs) {
      response.message = CONSTANTS.JOB_NOT_FOUND;
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
      return response;
    }

    response.message = CONSTANTS.JOB_FOUND;
    response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
    response.data = jobs;
    return response;
  }

  // Method for retrieving a single job by ID
  async singleJob(req) {
    const response = {};
    const { jobId } = req.params;

    // Call the repository's method to retrieve a single job
    const singleJob = await this.userRepo.singleJob(jobId);

    if (!singleJob) {
      response.message = CONSTANTS.JOB_NOT_FOUND;
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
      return response;
    }

    response.message = CONSTANTS.JOB_FOUND;
    response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
    response.data = singleJob;
    return response;
  }

  // Method for updating a job
  async updateJob(req) {
    const response = {};
    const { jobId } = req.params;

    // Call the repository's method to update the job
    const updatedJob = await this.userRepo.updateJob(jobId, req.body);

    if (!updatedJob) {
      response.message = CONSTANTS.JOB_UPDATE_FAILED;
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
      return response;
    }

    response.message = CONSTANTS.JOB_UPDATED;
    response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
    response.data = updatedJob;
    return response;
  }
}

module.exports = { JobService };
