const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils");

// models
const UserModel = require("../models/UserModel");

const loginUser = async (req, res) => {
  console.log("login", req.method);

  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).json({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token: generateToken(user),
        });
      } else {
        res.status(404).json({ message: "Password didn't match" });
      }
    } else {
      res.status(404).json({ message: "no such user found" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message});
  }
};

const registerUser = async (req, res) => {
  console.log("signup", req.method);

  try {
    const User = await UserModel.findOne({ email: req.body.email });
    if (User) {
      res.status(500).json({ message: "email already registered, Login!" });
    } else {
      const { firstName, lastName, email, password } = req.body;
      const newUser = new UserModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: bcrypt.hashSync(password),
      });

      const user = await newUser.save();

      res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user),
      });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = { loginUser, registerUser };
