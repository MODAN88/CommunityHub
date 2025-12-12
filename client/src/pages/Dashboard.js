import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [myEvents, setMyEvents] = React.useState([]);
  const [registeredEvents, setRegisteredEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch all events
        const eventsRes = await axios.get('/api/events');
        const allEvents = eventsRes.data.data;

        // Filter events created by user
        const created = allEvents.filter(event => event.organizer._id === user._id);
        setMyEvents(created);

        // Filter events user is registered for
        const registered = allEvents.filter(event =>
          event.participants.some(p => {
            // Handle both populated objects and plain IDs
            const userId = (p.user && p.user._id) ? p.user._id : p.user;
            return userId === user._id;
          })
        );
        setRegisteredEvents(registered);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div className="container">
          <h1>My Dashboard</h1>
          <p>Welcome back, {user?.name}!</p>
        </div>
      </div>

      <div className="container">
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>{myEvents.length}</h3>
              <p>Events Created</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>{registeredEvents.length}</h3>
              <p>Events Registered</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👤</div>
            <div className="stat-info">
              <h3>{user?.role}</h3>
              <p>Account Type</p>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>My Created Events</h2>
            <Link to="/create-event" className="btn btn-primary">
              Create New Event
            </Link>
          </div>
          
          {myEvents.length === 0 ? (
            <div className="empty-state">
              <p>You haven't created any events yet.</p>
              <Link to="/create-event" className="btn btn-primary">
                Create Your First Event
              </Link>
            </div>
          ) : (
            <div className="events-list">
              {myEvents.map(event => (
                <div key={event._id} className="dashboard-event-card">
                  <div className="event-info">
                    <h3>{event.title}</h3>
                    <p className="event-meta">
                      {new Date(event.date).toLocaleDateString()} • {event.location}
                    </p>
                    <p className="event-participants">
                      {event.participants.length} participants
                    </p>
                  </div>
                  <Link to={`/events/${event._id}`} className="btn btn-secondary">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dashboard-section">
          <h2>Registered Events</h2>
          
          {registeredEvents.length === 0 ? (
            <div className="empty-state">
              <p>You haven't registered for any events yet.</p>
              <Link to="/events" className="btn btn-primary">
                Browse Events
              </Link>
            </div>
          ) : (
            <div className="events-list">
              {registeredEvents.map(event => (
                <div key={event._id} className="dashboard-event-card">
                  <div className="event-info">
                    <h3>{event.title}</h3>
                    <p className="event-meta">
                      {new Date(event.date).toLocaleDateString()} • {event.location}
                    </p>
                    <p className="event-organizer">
                      Organized by: {event.organizer.name}
                    </p>
                  </div>
                  <Link to={`/events/${event._id}`} className="btn btn-secondary">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
