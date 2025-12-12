const Event = require('../models/Event');
const User = require('../models/User');
const { getCached, setCached, clearCachePattern } = require('../config/redis');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getEvents = async (req, res, next) => {
  try {
    // Check cache first
    const cacheKey = `events:${JSON.stringify(req.query)}`;
    const cachedEvents = await getCached(cacheKey);
    
    if (cachedEvents) {
      return res.status(200).json(cachedEvents);
    }

    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    query = Event.find(JSON.parse(queryStr))
      .populate('organizer', 'name email')
      .populate('participants.user', 'name email _id');

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-date');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Event.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const events = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    const result = {
      success: true,
      count: events.length,
      pagination,
      data: events
    };

    // Cache the results for 1 hour
    await setCached(cacheKey, result, 3600);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
exports.getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email avatar')
      .populate('participants.user', 'name email avatar');

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private
exports.createEvent = async (req, res, next) => {
  try {
    // Add organizer to req.body
    req.body.organizer = req.user.id;

    const event = await Event.create(req.body);

    // Invalidate events cache
    await clearCachePattern('events:*');

    res.status(201).json({
      success: true,
      data: event
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private
exports.updateEvent = async (req, res, next) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Make sure user is event organizer or admin
    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this event' });
    }

    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    // Invalidate events cache
    await clearCachePattern('events:*');

    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private
exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Make sure user is event organizer or admin
    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this event' });
    }

    await event.deleteOne();

    // Invalidate events cache
    await clearCachePattern('events:*');

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Register for event
// @route   POST /api/events/:id/register
// @access  Private
exports.registerForEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Check if event is full
    if (event.isFull()) {
      return res.status(400).json({ success: false, message: 'Event is full' });
    }

    // Check if user is already registered
    const alreadyRegistered = event.participants.some(
      participant => participant.user.toString() === req.user.id
    );

    if (alreadyRegistered) {
      return res.status(400).json({ success: false, message: 'Already registered for this event' });
    }

    // Add user to participants
    event.participants.push({ user: req.user.id });
    await event.save();

    // Add event to user's registered events
    await User.findByIdAndUpdate(req.user.id, {
      $push: { registeredEvents: event._id }
    });

    // Invalidate events cache
    await clearCachePattern('events:*');

    // Re-fetch with populated data
    const updatedEvent = await Event.findById(req.params.id)
      .populate('organizer', 'name email')
      .populate('participants.user', 'name email _id');

    res.status(200).json({
      success: true,
      data: updatedEvent
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Unregister from event
// @route   POST /api/events/:id/unregister
// @access  Private
exports.unregisterFromEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Check if user is registered
    const participantIndex = event.participants.findIndex(
      participant => participant.user.toString() === req.user.id
    );

    if (participantIndex === -1) {
      return res.status(400).json({ success: false, message: 'Not registered for this event' });
    }

    // Remove user from participants
    event.participants.splice(participantIndex, 1);
    await event.save();

    // Remove event from user's registered events
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { registeredEvents: event._id }
    });

    // Invalidate events cache
    await clearCachePattern('events:*');

    // Re-fetch with populated data
    const updatedEvent = await Event.findById(req.params.id)
      .populate('organizer', 'name email')
      .populate('participants.user', 'name email _id');

    res.status(200).json({
      success: true,
      data: updatedEvent
    });
  } catch (error) {
    next(error);
  }
};
