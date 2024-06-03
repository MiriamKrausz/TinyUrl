import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  clicks: [{
    insertedAt: { type: Date, default: Date.now },
    ipAddress: { type: String, required: true }
  }]
});

const Link = mongoose.model('Link', linkSchema);

export default Link;
