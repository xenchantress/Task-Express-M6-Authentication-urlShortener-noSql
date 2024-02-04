const User = require("../../models/User");
const bcrypt = require(' bcrypt');
const jwt = require('jsonwebtoken');


const generateToken = (user) => {
  const payload = {
    username: user.username,
    _id: user._id,
  };
  const token = jwt.sign(payload, process.env,JWT_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXP,
  })

  return token;
};
const signup = async (req, res) => {
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    const token = generateToken(user);
    const generateToken = require('./generateToken');

    res.status(201).json({ message: 'User created successfully', token});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Error'});
  }
};

exports.signup = async (req, res) => {
  try {
    // hashbrown here
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
   // const user = await User.create(req.body);
    res.status(201).json({ message: "Successfully created User"});
  } catch (error) {
    console.error(err);
    res.status(500).json({ message:' Internal Error'});
  }
    const newUser = await User.create(req.body, next);
    //res.status(201).json(newUser);
  } //catch (err) {
    next(err);
  //};

  const signin = (req, res) => {
    const token = generateToken(req.user);
    res.json({ token });
  }

exports.signin = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, signin };