// File: backend/src/models/Referral.js

const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema(
  {
    // Student requesting referral
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    
    // Alumni providing referral
    alumni: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    
    // Job reference (optional - if referral is for a specific job)
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
    },
    
    // Company and Position
    company: {
      type: String,
      required: [true, 'Company name is required'],
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
    },
    
    // Job URL
    jobUrl: {
      type: String,
      required: [true, 'Job URL is required'],
    },
    
    // Student's materials
    resumeUrl: String,
    coverLetter: String,
    message: {
      type: String,
      required: [true, 'Message is required'],
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
    
    // Status tracking
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'submitted', 'interviewing', 'offered', 'hired', 'declined'],
      default: 'pending',
    },
    
    // Alumni response
    alumniResponse: String,
    respondedAt: Date,
    
    // College scope
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
      required: true,
    },
    
    // Timeline tracking
    statusHistory: [
      {
        status: String,
        note: String,
        changedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes
referralSchema.index({ student: 1, status: 1 });
referralSchema.index({ alumni: 1, status: 1 });
referralSchema.index({ college: 1 });
referralSchema.index({ createdAt: -1 });

// Method to update status with history
referralSchema.methods.updateStatus = async function (newStatus, note = '') {
  this.status = newStatus;
  this.statusHistory.push({
    status: newStatus,
    note,
    changedAt: new Date(),
  });
  await this.save();
};

// Method to accept referral
referralSchema.methods.accept = async function (response) {
  this.status = 'accepted';
  this.alumniResponse = response;
  this.respondedAt = new Date();
  this.statusHistory.push({
    status: 'accepted',
    note: 'Referral accepted by alumni',
    changedAt: new Date(),
  });
  await this.save();
};

// Method to reject referral
referralSchema.methods.reject = async function (response) {
  this.status = 'rejected';
  this.alumniResponse = response;
  this.respondedAt = new Date();
  this.statusHistory.push({
    status: 'rejected',
    note: 'Referral rejected by alumni',
    changedAt: new Date(),
  });
  await this.save();
};

module.exports = mongoose.model('Referral', referralSchema);