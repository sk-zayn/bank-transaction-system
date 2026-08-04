const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function userRegister(req, res) {
  const { email, password, name } = req.body;

  const isExist = await userModel.findOne({ email: email });
  if (isExist) {
    return res.status(422).json({
      message: "User already exists with this email",
      status: "failed",
    });
  }

  const user = userModel.create({
    email,
    password,
    name,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  res.cookies("token", token);
  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    token,
  });
}

module.exports = {
  userRegister,
};
