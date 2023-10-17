const mongoose = require('mongoose');

// Define the schema for the 'Job' model
const jobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAuth', // Reference to the 'UserAuth' model
    required: true,  // This field is required
  },
  title: {
    type: String,   // A string representing the job's title
    required: true,  // This field is required
  },
  longDescription: {
    type: String,   // A string representing the long description of the job
    required: true,  // This field is required
  },
  shortDescription: {
    type: String,   // A string representing the short description of the job
    required: true,  // This field is required
  },
  type: {
    type: String,   // A string field
    enum: ['remote', 'hybrid', 'office'],  // Enum validation for specific values
    required: true,  // This field is required
  },
  minSalary: {
    type: Number,   // A number field representing the minimum salary for the job
    required: true,  // This field is required
  },
  maxSalary: {
    type: Number,   // A number field representing the maximum salary for the job
    required: true,  // This field is required
  },
  country: {
    type: String,   // A string representing the country where the job is located
    required: true,  // This field is required
  },
  city: {
    type: String,   // A string representing the city where the job is located
    required: true,  // This field is required
  },
  image: {
    type: String,   // A string representing the URL or path to an image related to the job
    required: true,  // This field is required
  },
}, {
  timestamps: true,     // Enable timestamps: 'createdAt' and 'updatedAt' fields
  strictPopulate: false  // Allow more flexible population without strict mode
});

// Create and export the 'Job' model based on the schema
module.exports = mongoose.model('Job', jobSchema);
