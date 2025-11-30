// File: backend/src/models/Message.js

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    // Conversation participants
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    
    // Message content
    content: {
      type: String,
      required: [true, 'Message content is required'],
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    
    // Message type
    type: {
      type: String,
      enum: ['text', 'image', 'file', 'link'],
      default: 'text',
    },
    
    // Attachments (if any)
    attachments: [
      {
        url: String,
        type: String,
        name: String,
        size: Number,
      },
    ],
    
    // Read status
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: Date,
    
    // Conversation ID (for grouping messages)
    conversationId: {
      type: String,
      required: true,
      index: true,
    },
    
    // College scope
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
      required: true,
    },
    
    // Soft delete
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
messageSchema.index({ conversationId: 1, createdAt: -1 });
messageSchema.index({ sender: 1, recipient: 1 });
messageSchema.index({ recipient: 1, isRead: 1 });

// Static method to create conversation ID
messageSchema.statics.createConversationId = function (userId1, userId2) {
  const ids = [userId1.toString(), userId2.toString()].sort();
  return `${ids[0]}_${ids[1]}`;
};

// Method to mark as read
messageSchema.methods.markAsRead = async function () {
  if (!this.isRead) {
    this.isRead = true;
    this.readAt = new Date();
    await this.save();
  }
};

module.exports = mongoose.model('Message', messageSchema);