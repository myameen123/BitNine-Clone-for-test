const mongoose = require("mongoose");

const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Email"],
    unique: true,
    validate: [validator.isEmail, "please Enter Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please enter Password"],
    minLegnth: [8, "Name should be greater then 8 charactors"],
    select: false,
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
userSchema.methods.comparePassword = async function (enteredPasssword) {
  return bcrypt.compare(enteredPasssword, this.password);
};
module.exports = new mongoose.model("User", userSchema);
