require('dotenv').config();

const User = require("../../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const generateToken = require('./generateToken'); 

const hashedPassword = async(password)=>{
  try{
    const hashPass = await bcrypt.hash(password, 10);
    return hashPass;
  } catch(error) {
    console.log(error);
  }
}

const signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token: token });
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res) => {
  try {
    //user = req.user
    const token = generateToken(req, res)
    return res.status(200).json({ token });
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};

    
    //hash the pass
  //   const saltRounds = 10;
  //   const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  //     //create the user
  //   req.body.password = await hashedPassword(req.body.password);
  //   const newUser = await User.create(req.body, next);
  //    //generate the token
  //   const token = generateToken(newUser)
  //   res.status(201).json({ token: token });
  // } catch (err) {
  //   next(err);
  // }
  // };
//   const token = jwt.sign(payload, process.env,JWT_SECRET, {
//     expiresIn: process.env.JWT_TOKEN_EXP,
//   });
  

const generateToken = (user) => {
  const payload = {
    username: user.username,
    _id: user._id,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "5h",
  });
  
  return token;
};
// const signup = async (req, res, next) => {
//   try{
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     req.body.password = hashedPassword;
//     const user = await User.create(req.body);
//     const token = generateToken(newUser);

//     //const generateToken = require('./generateToken');

//     res.status(201).json({ message: 'User created successfully', token});
//   } catch (error) {
//     next(err);
//     console.error(error);
//     res.status(500).json({ message: 'Internal Error'});
//   }
// };


//    //const user = await User.create(req.body);
//   //   res.status(201).json({ message: "Successfully created User"});
//   // } catch (error) {
//   //   console.error(err);
//   //   res.status(500).json({ message:' Internal Error'});
//   // }
    

//   const signin = (req, res) => {
//     try{
//       const token = generateToken(req.user);
//     res.json({ token });
//     } catch (error) {
//       res.status(500).json("Serer Error")
//     }
    
//   };

module.exports = { signup, signin, getUsers, generateToken };