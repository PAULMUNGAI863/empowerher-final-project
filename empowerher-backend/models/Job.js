const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  location: { type: String },
  skills: [{ type: String }],
  type: { type: String, enum: ['full-time','part-time','contract','internship'], default: 'full-time' },
  salary: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', JobSchema);
