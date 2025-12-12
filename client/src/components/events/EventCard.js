import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EventContext } from '../../context/EventContext';
import { AuthContext } from '../../context/AuthContext';
import './EventCard.css';

const EventCard = ({ event }) => {
  const { registerForEvent, unregisterFromEvent, getEvents } = useContext(EventContext);
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getAvailableSpots = () => {
    if (!event.maxParticipants) return 'Unlimited';
    return event.maxParticipants - event.participants.length;
  };

  const isRegistered = user && event.participants && Array.isArray(event.participants) && event.participants.some(p => {
    // Handle both populated objects and plain IDs
    const userId = (p.user && p.user._id) ? p.user._id : p.user;
    return userId === user._id;
  });
  
  const isFull = event.maxParticipants && event.participants.length >= event.maxParticipants;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      await registerForEvent(event._id);
      await getEvents();
      alert('Successfully registered for event!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to register');
    }
  };

  const handleUnregister = async (e) => {
    e.preventDefault();
    try {
      await unregisterFromEvent(event._id);
      await getEvents();
      alert('Successfully unregistered!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to unregister');
    }
  };

  return (
    <div className="event-card">
      <div className="event-category">{event.category}</div>
      <h3>{event.title}</h3>
      <p className="event-description">{event.description.substring(0, 100)}...</p>
      
      <div className="event-details">
        <div className="event-detail-item">
          <span className="icon">📅</span>
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="event-detail-item">
          <span className="icon">🕐</span>
          <span>{event.startTime} - {event.endTime}</span>
        </div>
        <div className="event-detail-item">
          <span className="icon">📍</span>
          <span>{event.location}</span>
        </div>
        <div className="event-detail-item">
          <span className="icon">👥</span>
          <span>{event.participants.length} registered | {getAvailableSpots()} spots</span>
        </div>
      </div>

      <div className="event-organizer">
        <small>Organized by: {event.organizer?.name || 'Unknown'}</small>
      </div>

      <div className="event-card-actions">
        <Link to={`/events/${event._id}`} className="btn btn-secondary">
          View Details
        </Link>
        {isRegistered ? (
          <button className="btn btn-danger" onClick={handleUnregister}>
            Unregister
          </button>
        ) : (
          <button 
            className="btn btn-primary" 
            onClick={handleRegister}
            disabled={isFull}
          >
            {isFull ? 'Full' : 'Register'}
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
