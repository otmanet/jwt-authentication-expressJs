const asyncHandler = require("express-async-handler");
const objectId = require("mongoose").Types.objectId;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("../models/User");
const login = asyncHandler(async (req, res) => {
  const { userName, passWord } = req.body;
});

const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, userName, password, email } = req.body;

  const findUser = await User.findOne({
    $and: [
      {
        username: userName,
        email: email,
      },
    ],
  });

  if (findUser) {
    return res.status(400).json({
      message: "User already exist",
    });
  }
});

module.exports = {
  login,
  register,
};
