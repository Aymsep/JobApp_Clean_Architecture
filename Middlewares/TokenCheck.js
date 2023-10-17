// Import constants and JWT verification function
const CONSTANTS = require('../Config/constants');
const { verify } = require('../Helpers/JWT');

// Middleware function for checking and verifying the token
exports.TokenCheck = (req, res, next) => {
  // Retrieve the authorization header from the request
  const authHeader = req.headers.authorization || null;
  // Extract the token from the authorization header
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is found, return an error response
  if (!token) {
    return res.json({
      message: CONSTANTS.ROUTE_NOT_FOUND,
      status: CONSTANTS.SERVER_ERROR_HTTP_CODE,
    });
  }

  // Verify the token and extract user data
  const userData = verify(token);

  // Attach user data to the request for further use
  req.username = userData.username;
  req.userid = userData.userid;

  // Proceed to the next middleware or route
  next();
};
