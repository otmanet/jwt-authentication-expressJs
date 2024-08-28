const jwt = require("jsonwebtoken");
const AppError = require("../helpers/appError");

// Token extraction logic should be separated for better modularity
// Single Responsibility Principle (SRP)
const extractTokenFromCookies = (cookies) => {
  // Ensure the token exists in the cookies
  if (!cookies.token) throw new AppError("Unauthorized", 401);
  return cookies.token;
};

// Token verification logic is separated to adhere to SRP
// Dependency Inversion Principle (DIP)
const verifyJwtToken = (token, secret) => {
  return jwt.verify(token, secret, (err, decoded) => {
    if (err) throw new AppError("Unauthorized", 401);
    return decoded;
  });
};

const verifyToken = (req, res, next) => {
  try {
    // Extract the token from the request cookies
    const token = extractTokenFromCookies(req.cookies);

    // Verify the JWT token and retrieve the decoded user information
    const decodedUser = verifyJwtToken(token, process.env.ACCESS_TOKEN_SECRET);

    // Attach the decoded user information to the request object
    req.user = decodedUser;

    // Pass control to the next middleware function
    next();
  } catch (err) {
    // Pass the error to the global error handler
    next(err);
  }
};

module.exports = verifyToken;
