import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import './CreateEvent.css';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'workshop',
    location: '',
    date: '',
    startTime: '',
    endTime: '',
    maxParticipants: ''
  });

  const { createEvent, getEvents } = useContext(EventContext);
  const navigate = useNavigate();

  const { title, description, category, location, date, startTime, endTime, maxParticipants } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const eventData = {
        ...formData,
        maxParticipants: maxParticipants ? parseInt(maxParticipants) : null
      };
      
      await createEvent(eventData);
      // Refresh events list before navigating
      await getEvents();
      alert('Event created successfully!');
      navigate('/events');
    } catch (err) {
      alert('Failed to create event. Please try again.');
    }
  };

  return (
    <div className="create-event-page">
      <div className="container">
        <div className="create-event-container">
          <h2>Create New Event</h2>
          
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Event Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={onChange}
                required
                placeholder="Enter event title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={onChange}
                required
                rows="5"
                placeholder="Describe your event"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={onChange}
                  required
                >
                  <option value="workshop">Workshop</option>
                  <option value="seminar">Seminar</option>
                  <option value="social">Social</option>
                  <option value="sports">Sports</option>
                  <option value="culture">Culture</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={location}
                  onChange={onChange}
                  required
                  placeholder="Event location"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={date}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="startTime">Start Time *</label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={startTime}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="endTime">End Time *</label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={endTime}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="maxParticipants">Max Participants (optional)</label>
              <input
                type="number"
                id="maxParticipants"
                name="maxParticipants"
                value={maxParticipants}
                onChange={onChange}
                min="1"
                placeholder="Leave empty for unlimited"
              />
              <small>Leave empty for unlimited participants</small>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Create Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
