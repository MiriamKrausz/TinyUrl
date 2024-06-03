// import mongoose from 'mongoose';
const mongoose = require('mongoose');

// import dotnev from 'dotnev.js';
// dotnev.config();
const uriLocal = "mongodb://localhost:27017/tinyurl";

const connectDB = async () => {
    try {
      await mongoose.connect(/*process.env.MONGODB_URI*/uriLocal, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected');
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };
  
  export default connectDB;