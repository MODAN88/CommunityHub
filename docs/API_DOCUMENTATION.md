# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register User
```http
POST /auth/register
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "member" // optional: "member" (default), "admin"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "member"
  }
}
```

#### Login User
```http
POST /auth/login
```

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "member"
  }
}
```

#### Get Current User
```http
GET /auth/me
```
**Headers:** Authorization required

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "member",
    // ... other user fields
  }
}
```

### Events

#### Get All Events
```http
GET /events
```

**Query Parameters:**
- `category` - Filter by category (workshop, seminar, social, sports, culture, volunteer, other)
- `sort` - Sort field (e.g., `-date` for descending, `date` for ascending)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "count": 10,
  "pagination": {
    "next": { "page": 2, "limit": 10 }
  },
  "data": [
    {
      "_id": "event_id",
      "title": "Community Workshop",
      "description": "Learn new skills",
      "category": "workshop",
      "location": "Community Center",
      "date": "2025-12-15T00:00:00.000Z",
      "startTime": "10:00",
      "endTime": "12:00",
      "maxParticipants": 50,
      "participants": [],
      "organizer": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "status": "upcoming",
      "createdAt": "2025-12-11T00:00:00.000Z"
    }
  ]
}
```

#### Get Single Event
```http
GET /events/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "event_id",
    "title": "Community Workshop",
    // ... full event details with populated organizer and participants
  }
}
```

#### Create Event
```http
POST /events
```
**Headers:** Authorization required

**Body:**
```json
{
  "title": "Community Workshop",
  "description": "Learn new skills with the community",
  "category": "workshop",
  "location": "Community Center, Main Street",
  "date": "2025-12-15",
  "startTime": "10:00",
  "endTime": "12:00",
  "maxParticipants": 50
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    // ... created event object
  }
}
```

#### Update Event
```http
PUT /events/:id
```
**Headers:** Authorization required  
**Access:** Event organizer or admin only

**Body:** (any fields to update)
```json
{
  "title": "Updated Workshop Title",
  "maxParticipants": 75
}
```

#### Delete Event
```http
DELETE /events/:id
```
**Headers:** Authorization required  
**Access:** Event organizer or admin only

**Response:**
```json
{
  "success": true,
  "data": {}
}
```

#### Register for Event
```http
POST /events/:id/register
```
**Headers:** Authorization required

**Response:**
```json
{
  "success": true,
  "data": {
    // ... updated event with user added to participants
  }
}
```

#### Unregister from Event
```http
POST /events/:id/unregister
```
**Headers:** Authorization required

**Response:**
```json
{
  "success": true,
  "data": {
    // ... updated event with user removed from participants
  }
}
```

### Users

#### Get All Users
```http
GET /users
```
**Headers:** Authorization required  
**Access:** Admin only

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "member",
      // ... other user fields (password excluded)
    }
  ]
}
```

#### Get User by ID
```http
GET /users/:id
```
**Headers:** Authorization required

#### Update User
```http
PUT /users/:id
```
**Headers:** Authorization required  
**Access:** User themselves or admin

#### Delete User
```http
DELETE /users/:id
```
**Headers:** Authorization required  
**Access:** Admin only

### Announcements

#### Get All Announcements
```http
GET /announcements
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "announcement_id",
      "title": "Important Update",
      "content": "Community center will be closed next Monday",
      "priority": "high",
      "author": {
        "_id": "user_id",
        "name": "Admin User",
        "email": "admin@example.com"
      },
      "isActive": true,
      "expiresAt": null,
      "createdAt": "2025-12-11T00:00:00.000Z"
    }
  ]
}
```

#### Create Announcement
```http
POST /announcements
```
**Headers:** Authorization required  
**Access:** Admin only

**Body:**
```json
{
  "title": "Important Update",
  "content": "Community center will be closed next Monday",
  "priority": "high", // "low", "medium", "high", "urgent"
  "expiresAt": "2025-12-20T00:00:00.000Z" // optional
}
```

#### Update Announcement
```http
PUT /announcements/:id
```
**Headers:** Authorization required  
**Access:** Admin only

#### Delete Announcement
```http
DELETE /announcements/:id
```
**Headers:** Authorization required  
**Access:** Admin only

## Error Responses

All endpoints may return error responses in this format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error
