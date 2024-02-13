const express = require('express');
const passport = require("passport");
const router = express.Router();

const { signup, signin, getUsers } = require('./users.controllers');

router.post('/signup', signup);
router.post('/signin',passport.authenticate('local', {session: false}), signin);
router.get('/users', getUsers);
router.post("/login", passport.authenticate("local", {session: false}), signin );
//userController.login  insted of signin

module.exports = router;
