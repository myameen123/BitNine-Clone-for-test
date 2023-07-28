// const ErrorHandler = require("../utils/ErrorHandling");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
    });
    sendToken(user, 201, res);
  } catch (err) {
    res.status(500).json({
      success: true,
      message: err.message,
    });
  }
});

//login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      res.status(401).json({
        success: false,
        message: "Please enter email and password",
      })
    );
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      })
    );
  }

  const isPassswordMatch = await user.comparePassword(password);
  console.log(password, isPassswordMatch);
  if (!isPassswordMatch) {
    return next(
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      })
    );
  }
  sendToken(user, 200, res);
});

//logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logout successfully",
  });
});
