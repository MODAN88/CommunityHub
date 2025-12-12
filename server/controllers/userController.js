const User = require('../models/User');
const { getCached, setCached, clearCachePattern } = require('../config/redis');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = async (req, res, next) => {
  try {
    // Check cache first
    const cacheKey = 'users:all';
    const cachedUsers = await getCached(cacheKey);
    
    if (cachedUsers) {
      return res.status(200).json({
        success: true,
        count: cachedUsers.length,
        data: cachedUsers,
        fromCache: true
      });
    }

    const users = await User.find().select('-password');

    // Cache the results for 30 minutes
    await setCached(cacheKey, users, 1800);

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
exports.getUser = async (req, res, next) => {
  try {
    // Check cache first
    const cacheKey = `user:${req.params.id}`;
    const cachedUser = await getCached(cacheKey);
    
    if (cachedUser) {
      return res.status(200).json({
        success: true,
        data: cachedUser,
        fromCache: true
      });
    }

    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Cache the result for 30 minutes
    await setCached(cacheKey, user, 1800);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
exports.updateUser = async (req, res, next) => {
  try {
    // Make sure user is updating their own profile or is admin
    if (req.params.id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this user' });
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Invalidate user cache
    await clearCachePattern(`user:${req.params.id}`);
    await clearCachePattern('users:*');

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    await user.deleteOne();

    // Invalidate user cache
    await clearCachePattern(`user:${req.params.id}`);
    await clearCachePattern('users:*');

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
