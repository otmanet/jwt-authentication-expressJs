const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = (user) => {
  const token = jwt.sign(
    {
      email: user.email, // Use properties from the saved user object
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    process.env.ACCESS_TOKEN_SECRET, // Secret key for signing the token
    {
      expiresIn: process.env.EXPIRATION_TOKEN, // Set the expiration time for the token
    }
  );
  return token;
};
const login = asyncHandler(async (req, res) => {
  // Destructure the userName and password from the request body
  const { userName, password } = req.body;

  // Find a user in the database where either the username matches userName or the email matches email
  const user = await User.findOne({
    $or: [{ userName: userName }, { email: userName }], // Corrected the field name to 'username' and checked against 'userName' for both username and email
  });

  // Compare the provided password with the hashed password in the database
  const checkPassword = bcrypt.compareSync(
    password,
    user.password,
    (err, result) => {
      if (err) {
        console.log(
          "Something went wrong while logging into your account. Please try again later."
        );
      }
      return result;
    }
  );

  // If no user is found, return a 400 status with an error message
  // If the password comparison fails, return a 400 status with an error message
  if (!user || !checkPassword) {
    return res.status(400).json({
      message: "Username or password incorrect, please try again",
    });
  }
  // Generate a JWT token after successfully validating the user
  const accessToken = generateToken(user);
  // Set a cookie named 'token' with the generated JWT token
  res.cookie("token", accessToken, {
    // Set the cookie to expire after 3600000  Milliseconds (1 hour)
    maxAge: 3600000,

    // Set the cookie as HTTP-only, which means it cannot be accessed via client-side JavaScript
    httpOnly: true,

    // Ensure the cookie is only sent over HTTPS connections for added security (secure:true)
    secure: false,

    // Prevent the cookie from being sent with cross-site requests, adding protection against CSRF attacks
    sameSite: "strict",
  });
  // Send the token in the response with a success message
  res.status(201).json({
    message: "Login successfully",
    token: accessToken,
  });
});

const register = asyncHandler(async (req, res) => {
  // Destructure the request body to extract firstName, lastName, userName, password, and email
  let { firstName, lastName, userName, password, email } = req.body;

  // Define an error message to display if something goes wrong while creating a new account
  const messageError =
    "Something went wrong while creating a new account. Please try again later.";

  // Find a user by username and email
  const findUser = await User.findOne({
    $or: [{ userName: userName }, { email: email }],
  });

  if (findUser) {
    // Return a 400 status with a message if the user already exists
    return res.status(400).json({
      message: "User already exists",
    });
  }

  // Generate a salt with a cost factor of 10 using bcrypt (asynchronously)
  const salt = await bcrypt.genSalt(10);
  // Hash the password using the generated salt (synchronously) and handle the result with a callback
  const hashPassword = bcrypt.hashSync(password, salt, (err, hash) => {
    // If an error occurs during the hashing process, return a 400 status with an error message
    if (err) {
      return res.status(400).json({
        message: messageError,
      });
    }
    // If hashing is successful, return the hashed password
    return hash;
  });

  // Create a new instance of the User model using the data from the request body
  const saveUser = new User({
    firstName,
    lastName,
    userName,
    password: hashPassword,
    email,
  });

  // Save the user to the database
  saveUser
    .save()
    .then(() => {
      // Generate a JWT token after successfully saving the user
      const accessToken = generateToken(user);
      // Set a cookie named 'token' with the generated JWT token
      res.cookie("token", accessToken, {
        // Set the cookie to expire after 3600000  Milliseconds (1 hour)
        maxAge: 3600000,

        // Set the cookie as HTTP-only, which means it cannot be accessed via client-side JavaScript
        httpOnly: true,

        // Ensure the cookie is only sent over HTTPS connections for added security (secure:true)
        secure: false,

        // Prevent the cookie from being sent with cross-site requests, adding protection against CSRF attacks
        sameSite: "strict",
      });
      // Send the token in the response
      res.status(201).json({
        message: "Account created successfully",
        token: accessToken,
      });
    })
    .catch((err) => {
      // Handle any errors that occur during user creation
      res.status(400).json({
        message:
          "Something went wrong while creating a new account. Please try again later.",
        error: err.message, // Optionally include the error message for debugging purposes
      });
    });
});

module.exports = {
  login,
  register,
};
