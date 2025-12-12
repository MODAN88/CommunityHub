# CommunityHub

A full-stack web application for managing community events, members, and activities.

> 📖 **[Quick Start Guide](./START_HERE.md)** | **[How to Run](./HOW_TO_RUN.txt)**

## Features

- **User Authentication & Authorization**
  - User registration and login
  - JWT-based authentication
  - Role-based access control (Admin, Member, Guest)

- **Event Management**
  - Create, read, update, and delete events
  - Event registration and attendance tracking
  - Event categories and filtering

- **Member Management**
  - User profiles
  - Member directory
  - Activity tracking

- **Community Features**
  - Announcements
  - News feed
  - Comments and interactions

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Express Validator

### Frontend
- React
- React Router
- Axios
- Context API for state management
- CSS3/Modern styling

## 🚀 Quick Start (Choose One)

### ⚡ Fastest Way - Automated Script

**macOS/Linux:**
```bash
chmod +x install-and-run.sh
./install-and-run.sh
```

**Windows:**
```bash
setup.bat
```

This will automatically:
- Install all dependencies
- Setup environment
- Start MongoDB (if available)
- Launch the application

### 📋 Manual Installation

If you prefer manual setup, see [INSTALLATION.md](./INSTALLATION.md) for detailed instructions.

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/MODAN88/CommunityHub.git
cd CommunityHub
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

4. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. Start MongoDB (if running locally):
```bash
# macOS with Homebrew:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod

# Windows: MongoDB should start automatically as a service
```

6. Run the application:

**Development mode (both servers):**
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend application on `http://localhost:3000`

**Or run separately:**

Backend only:
```bash
npm run server
```

Frontend only:
```bash
npm run client
```

**Production:**
```bash
npm run build
npm start
```

## 🌐 Access the Application

After running `npm run dev`:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/api/health

## 🎯 First Steps

1. Open http://localhost:3000
2. Click "Register" and create your account
3. Login with your credentials
4. Create your first event!

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin)

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create new event (Auth required)
- `PUT /api/events/:id` - Update event (Creator/Admin)
- `DELETE /api/events/:id` - Delete event (Creator/Admin)
- `POST /api/events/:id/register` - Register for event
- `POST /api/events/:id/unregister` - Unregister from event

### Announcements
- `GET /api/announcements` - Get all announcements
- `POST /api/announcements` - Create announcement (Admin)
- `PUT /api/announcements/:id` - Update announcement (Admin)
- `DELETE /api/announcements/:id` - Delete announcement (Admin)

## Project Structure

```
CommunityHub/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Event.js
│   │   └── Announcement.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── events.js
│   │   └── announcements.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── error.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── eventController.js
│   │   └── announcementController.js
│   └── index.js
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── package.json
├── .env.example
└── README.md
```

## License

ISC
