const mongoose = require('mongoose');

class jobsRepository {
  constructor(userModal) {
    // Constructor to initialize the repository with a userModal
    this.userModal = userModal;
  }

  // Add a new job
  async addJob(job) {
    // Log the incoming job data for debugging purposes
    console.log('Inside Repository:', job);

    // Use the 'create' method to add a job to the database
    const createdJob = await this.userModal.create(job);
    return createdJob;
  }

  // Delete a job by its ID
  async deleteJob(id) {
    // Use the 'deleteOne' method to remove a job from the database
    return await this.userModal.deleteOne({ _id: id });
  }

  // Retrieve all jobs created by a specific user
  async myJobs(id) {
    // Use the 'find' method to get all jobs associated with a specific user
    return await this.userModal.find({ userId: id });
  }

  // Retrieve all jobs, excluding userId and _id fields
  async allJobs() {
    // Use the 'find' method to get all jobs, excluding userId and _id fields
    return await this.userModal.find({}, '-userId -_id');
  }

  // Retrieve a single job by its ID
  async singleJob(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      // Check if the provided ID is a valid ObjectId; if not, return an empty array
      return [];
    }
    // Use the 'find' method to get a single job by its ID
    return await this.userModal.find({ _id: id });
  }

  // Update a job by its ID
  async updateJob(id, updatedJob) {
    // Use the 'findOneAndUpdate' method to update a job and populate the 'userId' field
    return await this.userModal
      .findOneAndUpdate({ _id: id }, { $set: updatedJob }, { new: true })
      .populate('userId');
  }
}

module.exports = { jobsRepository };
