const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  urls: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Url',
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);
