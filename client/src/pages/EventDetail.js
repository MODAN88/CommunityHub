import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import { AuthContext } from '../context/AuthContext';
import './EventDetail.css';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { event, getEvent, registerForEvent, unregisterFromEvent, deleteEvent, loading } = useContext(EventContext);
  const { user, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    getEvent(id);
  }, [id]);

  if (loading || !event) {
    return <div className="loading">Loading event details...</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const isOrganizer = user && event.organizer._id === user._id;
  const isRegistered = user && event.participants && Array.isArray(event.participants) && event.participants.some(p => {
    // Handle both populated objects and plain IDs
    const userId = (p.user && p.user._id) ? p.user._id : p.user;
    return userId === user._id;
  });
  
  const isFull = event.maxParticipants && event.participants.length >= event.maxParticipants;

  const handleRegister = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      await registerForEvent(id);
      getEvent(id); // Refresh event data
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to register');
    }
  };

  const handleUnregister = async () => {
    try {
      await unregisterFromEvent(id);
      getEvent(id); // Refresh event data
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to unregister');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        navigate('/events');
      } catch (err) {
        alert('Failed to delete event');
      }
    }
  };

  return (
    <div className="event-detail-page">
      <div className="container">
        <div className="event-detail">
          <div className="event-header">
            <div className="event-category-badge">{event.category}</div>
            <h1>{event.title}</h1>
            <p className="event-organizer">
              Organized by: <strong>{event.organizer.name}</strong>
            </p>
          </div>

          <div className="event-content">
            <div className="event-info">
              <div className="info-section">
                <h3>About This Event</h3>
                <p>{event.description}</p>
              </div>

              <div className="info-section">
                <h3>Event Details</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="icon">📅</span>
                    <div>
                      <strong>Date</strong>
                      <p>{formatDate(event.date)}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <span className="icon">🕐</span>
                    <div>
                      <strong>Time</strong>
                      <p>{event.startTime} - {event.endTime}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <span className="icon">📍</span>
                    <div>
                      <strong>Location</strong>
                      <p>{event.location}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <span className="icon">👥</span>
                    <div>
                      <strong>Participants</strong>
                      <p>{event.participants.length} registered</p>
                      {event.maxParticipants && (
                        <p>{event.maxParticipants - event.participants.length} spots remaining</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h3>Registered Participants</h3>
                {event.participants.length === 0 ? (
                  <p>No participants yet. Be the first to register!</p>
                ) : (
                  <div className="participants-list">
                    {event.participants.map((participant) => (
                      <div key={participant._id} className="participant">
                        <span>{participant.user.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="event-actions">
              {isOrganizer ? (
                <div className="action-buttons">
                  <button className="btn btn-danger btn-block" onClick={handleDelete}>
                    Delete Event
                  </button>
                </div>
              ) : isRegistered ? (
                <button className="btn btn-secondary btn-block" onClick={handleUnregister}>
                  Unregister from Event
                </button>
              ) : (
                <button 
                  className="btn btn-primary btn-block" 
                  onClick={handleRegister}
                  disabled={isFull}
                >
                  {isFull ? 'Event Full' : 'Register for Event'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
