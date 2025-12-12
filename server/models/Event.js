const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add an event title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['workshop', 'seminar', 'social', 'sports', 'culture', 'volunteer', 'other']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  date: {
    type: Date,
    required: [true, 'Please add an event date']
  },
  startTime: {
    type: String,
    required: [true, 'Please add a start time']
  },
  endTime: {
    type: String,
    required: [true, 'Please add an end time']
  },
  maxParticipants: {
    type: Number,
    default: null // null means unlimited
  },
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    registeredAt: {
      type: Date,
      default: Date.now
    }
  }],
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    type: String,
    default: 'default-event.jpg'
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add virtual for available spots
EventSchema.virtual('availableSpots').get(function() {
  if (this.maxParticipants === null) return 'Unlimited';
  return this.maxParticipants - this.participants.length;
});

// Check if event is full
EventSchema.methods.isFull = function() {
  if (this.maxParticipants === null) return false;
  return this.participants.length >= this.maxParticipants;
};

module.exports = mongoose.model('Event', EventSchema);
