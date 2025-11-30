// File: backend/src/models/Job.js

const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    companyLogo: String,
    
    description: {
      type: String,
      required: [true, 'Job description is required'],
      minlength: [50, 'Description must be at least 50 characters'],
    },
    
    requirements: [String],
    responsibilities: [String],
    
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    locationType: {
      type: String,
      enum: ['remote', 'onsite', 'hybrid'],
      required: true,
    },
    
    // Employment Details
    employmentType: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'internship'],
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ['entry', 'mid', 'senior', 'lead'],
      default: 'entry',
    },
    
    // Salary Information (optional)
    salary: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'USD',
      },
    },
    
    // Skills Required
    skills: [String],
    
    // Application
    applicationUrl: String,
    applicationEmail: String,
    applicationDeadline: Date,
    
    // Posted By (Alumni)
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    
    // College Scope
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
      required: true,
    },
    
    // Engagement
    views: {
      type: Number,
      default: 0,
    },
    applications: {
      type: Number,
      default: 0,
    },
    
    // Status
    isActive: {
      type: Boolean,
      default: true,
    },
    expiresAt: Date,
    
    // Moderation
    isApproved: {
      type: Boolean,
      default: false,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    approvedAt: Date,
  },
  {
    timestamps: true,
  }
);

// Indexes
jobSchema.index({ college: 1, isActive: 1, isApproved: 1 });
jobSchema.index({ postedBy: 1 });
jobSchema.index({ title: 'text', company: 'text', description: 'text' });
jobSchema.index({ skills: 1 });
jobSchema.index({ createdAt: -1 });

// Auto-expire jobs after deadline
jobSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Method to increment views
jobSchema.methods.incrementViews = async function () {
  this.views += 1;
  await this.save();
};

// Method to increment applications
jobSchema.methods.incrementApplications = async function () {
  this.applications += 1;
  await this.save();
};

// Virtual for days since posted
jobSchema.virtual('daysAgo').get(function () {
  const diffTime = Math.abs(new Date() - this.createdAt);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Ensure virtuals are included
jobSchema.set('toJSON', { virtuals: true });
jobSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Job', jobSchema);