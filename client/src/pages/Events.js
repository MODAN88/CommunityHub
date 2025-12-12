import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import EventCard from '../components/events/EventCard';
import './Events.css';

const Events = () => {
  const { events, getEvents, loading } = useContext(EventContext);
  const [filter, setFilter] = useState('all');
  const location = useLocation();

  useEffect(() => {
    // Fetch events on mount and when navigating back
    getEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]); // Re-fetch when path changes

  // Ensure events is always an array (handle null/undefined/error states)
  const safeEvents = Array.isArray(events) ? events : [];
  const filteredEvents = filter === 'all' 
    ? safeEvents 
    : safeEvents.filter(event => event.category === filter);

  return (
    <div className="events-page">
      <div className="page-header">
        <div className="container">
          <h1>Community Events</h1>
          <p>Discover and join amazing events in your community</p>
        </div>
      </div>

      <div className="container">
        <div className="filter-section">
          <label>Filter by category:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Events</option>
            <option value="workshop">Workshop</option>
            <option value="seminar">Seminar</option>
            <option value="social">Social</option>
            <option value="sports">Sports</option>
            <option value="culture">Culture</option>
            <option value="volunteer">Volunteer</option>
            <option value="other">Other</option>
          </select>
        </div>

        {loading ? (
          <div className="loading">Loading events...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="no-events">
            <h3>No events found</h3>
            <p>Check back later for upcoming events!</p>
          </div>
        ) : (
          <div className="grid">
            {filteredEvents.map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
