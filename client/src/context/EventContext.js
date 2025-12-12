import React, { createContext, useReducer } from 'react';
import api from '../utils/api';

const initialState = {
  events: [],
  event: null,
  loading: true,
  error: null
};

export const EventContext = createContext(initialState);

const eventReducer = (state, action) => {
  switch (action.type) {
    case 'GET_EVENTS':
      return {
        ...state,
        events: Array.isArray(action.payload) ? action.payload : [],
        loading: false
      };
    case 'GET_EVENT':
      return {
        ...state,
        event: action.payload,
        loading: false
      };
    case 'ADD_EVENT':
      return {
        ...state,
        events: [action.payload, ...(Array.isArray(state.events) ? state.events : [])],
        loading: false
      };
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: (Array.isArray(state.events) ? state.events : []).map(event =>
          event._id === action.payload._id ? action.payload : event
        ),
        loading: false
      };
    case 'DELETE_EVENT':
      return {
        ...state,
        events: (Array.isArray(state.events) ? state.events : []).filter(event => event._id !== action.payload),
        loading: false
      };
    case 'EVENT_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  // Get all events
  const getEvents = async (params = '') => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const res = await api.get(`/api/events${params}`);
      
      // Extract events array from response
      const eventsData = res.data.data || [];
      
      dispatch({
        type: 'GET_EVENTS',
        payload: eventsData
      });
    } catch (err) {
      console.error('getEvents error:', err);
      dispatch({
        type: 'EVENT_ERROR',
        payload: err.response?.data?.message || 'Failed to fetch events'
      });
    }
  };

  // Get single event
  const getEvent = async (id) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const res = await api.get(`/api/events/${id}`);
      dispatch({
        type: 'GET_EVENT',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'EVENT_ERROR',
        payload: err.response?.data?.message || 'Failed to fetch event'
      });
    }
  };

  // Create event
  const createEvent = async (eventData) => {
    try {
      const res = await api.post('/api/events', eventData);
      dispatch({
        type: 'ADD_EVENT',
        payload: res.data.data
      });
      return res.data.data;
    } catch (err) {
      dispatch({
        type: 'EVENT_ERROR',
        payload: err.response?.data?.message || 'Failed to create event'
      });
      throw err;
    }
  };

  // Update event
  const updateEvent = async (id, eventData) => {
    try {
      const res = await api.put(`/api/events/${id}`, eventData);
      dispatch({
        type: 'UPDATE_EVENT',
        payload: res.data.data
      });
      return res.data.data;
    } catch (err) {
      dispatch({
        type: 'EVENT_ERROR',
        payload: err.response?.data?.message || 'Failed to update event'
      });
      throw err;
    }
  };

  // Delete event
  const deleteEvent = async (id) => {
    try {
      await api.delete(`/api/events/${id}`);
      dispatch({
        type: 'DELETE_EVENT',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'EVENT_ERROR',
        payload: err.response?.data?.message || 'Failed to delete event'
      });
      throw err;
    }
  };

  // Register for event
  const registerForEvent = async (id) => {
    try {
      const res = await api.post(`/api/events/${id}/register`);
      dispatch({
        type: 'UPDATE_EVENT',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'EVENT_ERROR',
        payload: err.response?.data?.message || 'Failed to register for event'
      });
      throw err;
    }
  };

  // Unregister from event
  const unregisterFromEvent = async (id) => {
    try {
      const res = await api.post(`/api/events/${id}/unregister`);
      dispatch({
        type: 'UPDATE_EVENT',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'EVENT_ERROR',
        payload: err.response?.data?.message || 'Failed to unregister from event'
      });
      throw err;
    }
  };

  return (
    <EventContext.Provider
      value={{
        events: state.events,
        event: state.event,
        loading: state.loading,
        error: state.error,
        getEvents,
        getEvent,
        createEvent,
        updateEvent,
        deleteEvent,
        registerForEvent,
        unregisterFromEvent
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
