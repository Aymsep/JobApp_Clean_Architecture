// Import necessary modules and classes
const { UserService } = require('../Services/userService');
const { UserRepository } = require('../Repo/userRepo');
const Userschema = require('../Modals/UserAuth'); // Note: It's typically spelled as 'Models'

// Create instances of the repository and service using the provided schema
const userRepo = new UserRepository(Userschema);
const userServ = new UserService(userRepo);

// Controller functions for handling user registration, login, and profile operations
exports.Register = async (req, res) => {
    // Call the 'Register' method from the service to register a new user
    const user = await userServ.Register(req);
    console.log(user); // Log for debugging
    // Respond with the result in JSON format
    res.json(user);
};

exports.Login = async (req, res) => {
    // Call the 'Login' method from the service to handle user login
    const user = await userServ.Login(req);
    console.log('user', user); // Log for debugging
    // Respond with the result in JSON format
    res.json(user);
};

exports.Profile = async (req, res) => {
    // Call the 'Profile' method from the service to fetch user profile information
    const user = await userServ.Profile(req);
    console.log('user', user); // Log for debugging
    // Respond with the result in JSON format
    res.json(user);
};
