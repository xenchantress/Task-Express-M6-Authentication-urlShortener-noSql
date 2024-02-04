const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('YOUR_CONNECTION_STRING');
  console.log(`mongo connected: ${conn.connection.host}`);
  }catch(error) {
    console.log(error);
  }
};

module.exports = connectDB;
