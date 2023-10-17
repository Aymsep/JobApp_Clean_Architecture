const Job = require('../Modals/Jobs'); // Import your Job model
const CONSTANTS = require('../Config/constants')

// Authorization middleware for update and delete
async function authorizeJobAction(req, res, next) {
  const jobId = req.params.jobId; // Get the job ID from the request parameters
  const userId = req.userid; // Get the userID from the token

  try {
    Job.findById(jobId)
    .then((job) => {
        if (!job) {
          return res.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({ message: CONSTANTS.JOB_NOT_FOUND });
        }
    
        if (job.userId.toString() !== userId) {
          return res.status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE).json({ message: CONSTANTS.ROUTE_NOT_FOUND });
        }
    
        next(); // User is authorized to modify the job
    })

  } catch (error) {
    return res.status(CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR_MESSAGE });
  }
}

module.exports = {authorizeJobAction};
