// backend/src/models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    lowercase: true,
  },
  provider: {
    type: String,
    required: true,
    enum: ['instagram', 'x'] 
  },
  instagramId: {
    type: String,
    unique: true,
    sparse: true
  },
  xId: { 
    type: String,
    unique: true,
    sparse: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);