const express = require('express');
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  unregisterFromEvent
} = require('../controllers/eventController');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/')
  .get(getEvents)
  .post(protect, createEvent);

router.route('/:id')
  .get(getEvent)
  .put(protect, updateEvent)
  .delete(protect, deleteEvent);

router.route('/:id/register')
  .post(protect, registerForEvent);

router.route('/:id/unregister')
  .post(protect, unregisterFromEvent);

module.exports = router;
