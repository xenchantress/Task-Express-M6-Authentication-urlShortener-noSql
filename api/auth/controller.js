const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//this will return an encrypted password
require("dotenv").config;
// const generateToken = require('./generateToken');
const hashPass = async (password) => {
  const hashedPass = await bcrypt.hash(password, 10);
  return hashedPass;
};

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    //instead of wakanda forever I should insert the token aka the encrypted pass
    expiresIn: "5h",
  });

  return token;
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    //hash will encrypt my password or the users password

    req.body.password = await hashPass(req.body.password);
    const user = await User.create(req.body);
    const token = generateToken(user);
    return res.status(201).json({ token: token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    //const user = req.user
    const token = generateToken(req.user);
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
exports.signin = async (req, res) => {
  try {
    const token = generateToken(req, res);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getAllUsers, register, login };
