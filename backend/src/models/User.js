// File: backend/src/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [3, 'Name must be at least 3 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false, // Don't return password by default
    },
    role: {
      type: String,
      enum: ['student', 'alumni', 'faculty', 'admin'],
      required: [true, 'Role is required'],
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
      required: [true, 'College reference is required'],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    verificationTokenExpiry: Date,
    
    // Profile Information
    profilePicture: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters'],
      default: '',
    },
    
    // Academic Information
    degree: String,
    major: String,
    graduationYear: Number,
    
    // Professional Information (mainly for Alumni)
    currentCompany: String,
    currentPosition: String,
    workExperience: [
      {
        company: String,
        position: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],
    skills: [String],
    
    // Contact & Social
    phone: String,
    linkedinUrl: String,
    githubUrl: String,
    portfolioUrl: String,
    
    // Mentorship (for Alumni/Faculty)
    isMentor: {
      type: Boolean,
      default: false,
    },
    mentorshipTopics: [String],
    
    // Activity Tracking
    lastLogin: Date,
    
    // Password Reset
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ college: 1, role: 1 });
userSchema.index({ isVerified: 1 });

// Hash password before saving
userSchema.pre('save', async function (next) {
  // Only hash if password is modified
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Method to get public profile (without sensitive data)
userSchema.methods.getPublicProfile = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.verificationToken;
  delete userObject.verificationTokenExpiry;
  delete userObject.resetPasswordToken;
  delete userObject.resetPasswordExpiry;
  return userObject;
};

// Virtual for full profile completeness
userSchema.virtual('profileCompleteness').get(function () {
  let completeness = 0;
  const fields = [
    'fullName',
    'email',
    'bio',
    'degree',
    'major',
    'graduationYear',
    'currentCompany',
    'currentPosition',
    'skills',
  ];
  
  fields.forEach((field) => {
    if (this[field] && this[field].length > 0) {
      completeness += 100 / fields.length;
    }
  });
  
  return Math.round(completeness);
});

// Ensure virtuals are included in JSON
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('User', userSchema);