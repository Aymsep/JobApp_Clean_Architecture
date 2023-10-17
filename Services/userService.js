const CONSTANTS = require('../Config/constants');
const { HashPassword, VerifyPassword } = require('../Helpers/Hashing');
const jwt = require('jsonwebtoken');

class UserService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  // User registration
  async Register(req) {
    const response = {};

    const { name, email, password } = req.body;

    // Check if required fields are provided
    if (!name || !email || !password) {
      response.message = CONSTANTS.FIELD_EMPTY;
      response.status = CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE;
      return response;
    }

    // Hash the password before storing it
    const newUser = {
      name,
      email,
      password: await HashPassword(password),
    };

    // Register the user with the repository
    const user = await this.userRepo.Register(newUser);

    if (!user) {
      response.message = CONSTANTS.SERVER_ERROR_MESSAGE;
      response.status = CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_CODE;
      return response;
    }

    response.message = CONSTANTS.USER_CREATED;
    response.status = CONSTANTS.SERVER_CREATED_HTTP_CODE;
    response.data = user;
    return response;
  }

  // User login
  async Login(req) {
    const response = {};

    const { email, password } = req.body;

    // Find the user by email
    const user = await this.userRepo.Login(email);

    if (!user) {
      response.message = CONSTANTS.USER_NOT_FOUND;
      response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
      return response;
    }

    // Verify the provided password against the stored hashed password
    const passwordMatch = await VerifyPassword(password, user.password);

    if (!passwordMatch) {
      response.message = CONSTANTS.PASSWORD_NOT_FOUND;
      response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
      return response;
    }

    // Create a JWT token for authentication
    const token = jwt.sign(
      { userid: user._id, username: user.name },
      process.env.JWT_SECRET_KEY || 'defaultSecretKey'
    );

    response.message = CONSTANTS.USER_LOGIN_OK;
    response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
    response.data = { id: user._id, username: user.name };
    response.token = token;
    return response;
  }

  // User profile
  async Profile(req) {
    const response = {};

    // Build a response with user data
    response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
    response.data = {
      username: req.username,
      userid: req.userid,
    };

    return response;
  }
}

module.exports = { UserService };
