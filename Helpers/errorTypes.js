class ServerError extends Error {
    constructor(message, details) {
      super(message);
      this.name = 'ServerError';
      this.status = 500; // Internal Server Error
      this.details = details;
    }
  }
  
  class BadRequestError extends Error {
    constructor(message, details) {
      super(message);
      this.name = 'BadRequestError';
      this.status = 400; // Bad Request
      this.details = details;
    }
  }
  
  module.exports = {
    ServerError,
    BadRequestError,
  };
  