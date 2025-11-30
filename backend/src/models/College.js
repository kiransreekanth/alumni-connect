// File: backend/src/models/College.js

const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'College name is required'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    emailDomain: {
      type: String,
      required: [true, 'Email domain is required'],
      unique: true,
      lowercase: true,
      trim: true,
      // e.g., "stanford.edu", "mit.edu"
    },
    logo: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    
    // Location
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String,
    },
    
    // Contact Information
    website: String,
    phone: String,
    contactEmail: String,
    
    // Settings
    settings: {
      requireAdminApproval: {
        type: Boolean,
        default: true,
      },
      allowPublicJobs: {
        type: Boolean,
        default: false,
      },
      enableChat: {
        type: Boolean,
        default: true,
      },
      enableMentorship: {
        type: Boolean,
        default: true,
      },
    },
    
    // Statistics
    stats: {
      totalStudents: {
        type: Number,
        default: 0,
      },
      totalAlumni: {
        type: Number,
        default: 0,
      },
      totalFaculty: {
        type: Number,
        default: 0,
      },
      totalJobs: {
        type: Number,
        default: 0,
      },
    },
    
    // Admin Users (College Admins)
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    
    // Status
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create slug from name before saving
collegeSchema.pre('save', function (next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

// Indexes
collegeSchema.index({ slug: 1 });
collegeSchema.index({ emailDomain: 1 });
collegeSchema.index({ isActive: 1 });

// Method to check if email belongs to this college
collegeSchema.methods.isValidEmail = function (email) {
  const emailDomain = email.split('@')[1];
  return emailDomain === this.emailDomain;
};

// Static method to find college by email
collegeSchema.statics.findByEmail = function (email) {
  const emailDomain = email.split('@')[1];
  return this.findOne({ emailDomain });
};

// Method to increment user counts
collegeSchema.methods.incrementUserCount = async function (role) {
  if (role === 'student') {
    this.stats.totalStudents += 1;
  } else if (role === 'alumni') {
    this.stats.totalAlumni += 1;
  } else if (role === 'faculty') {
    this.stats.totalFaculty += 1;
  }
  await this.save();
};

module.exports = mongoose.model('College', collegeSchema);