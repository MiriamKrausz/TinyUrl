import mongoose from "mongoose";
const LinkSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true }
});

const Link = mongoose.model('Link', LinkSchema);
module.exports = Link;
