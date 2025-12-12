# Installation and Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)

## Step 1: Clone the Repository

```bash
git clone https://github.com/MODAN88/CommunityHub.git
cd CommunityHub
```

## Step 2: Install Backend Dependencies

From the root directory:

```bash
npm install
```

This will install all the backend dependencies listed in `package.json`.

## Step 3: Install Frontend Dependencies

Navigate to the client folder and install frontend dependencies:

```bash
cd client
npm install
cd ..
```

## Step 4: Set Up Environment Variables

1. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

2. Edit the `.env` file with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/communityhub
JWT_SECRET=your_super_secret_jwt_key_here_change_this
JWT_EXPIRE=7d
NODE_ENV=development

# Email Configuration (optional - for future features)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

# Client URL
CLIENT_URL=http://localhost:3000
```

**Important Notes:**
- Replace `your_super_secret_jwt_key_here_change_this` with a strong, random secret key
- If using MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string
- Email configuration is optional for now

## Step 5: Start MongoDB

### Option A: Local MongoDB

If you installed MongoDB locally:

```bash
# On macOS with Homebrew:
brew services start mongodb-community

# On Windows:
# MongoDB should start as a service automatically
# Or run: mongod

# On Linux:
sudo systemctl start mongod
```

### Option B: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env` file

## Step 6: Run the Application

### Development Mode (Both Frontend & Backend)

From the root directory:

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:3000`

### Backend Only

```bash
npm run server
```

### Frontend Only

```bash
npm run client
```

## Step 7: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

The backend API will be running on:
```
http://localhost:5000
```

## Step 8: Create Your First Admin User

You can register through the UI, or use an API tool like Postman:

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "password123",
  "role": "admin"
}
```

## Testing the Installation

1. **Check Backend Health:**
   ```bash
   curl http://localhost:5000/api/health
   ```
   Should return: `{"success":true,"message":"Server is running"}`

2. **Register a User:**
   - Go to `http://localhost:3000/register`
   - Fill in the registration form
   - Submit

3. **Create an Event:**
   - Login with your credentials
   - Click "Create Event" in the navbar
   - Fill in the event details
   - Submit

## Running Tests

To run the test suite:

```bash
npm test
```

## Production Build

To create a production build:

```bash
# Build the frontend
npm run build

# Start the production server
npm start
```

## Troubleshooting

### MongoDB Connection Issues

If you get "MongoDB connection failed":
- Ensure MongoDB is running
- Check your `MONGODB_URI` in `.env`
- Verify network connectivity (for MongoDB Atlas)

### Port Already in Use

If ports 3000 or 5000 are already in use:
- Change `PORT` in `.env` for backend
- Frontend port can be changed in `client/package.json`

### Module Not Found Errors

Run:
```bash
# In root directory
npm install

# In client directory
cd client
npm install
```

### Cannot Login After Registration

- Check browser console for errors
- Verify JWT_SECRET is set in `.env`
- Clear browser cookies and try again

## Default Test Credentials

After setup, you can create test users:

**Admin User:**
- Email: admin@communityhub.com
- Password: admin123
- Role: admin

**Regular Member:**
- Email: member@communityhub.com
- Password: member123
- Role: member

## Next Steps

After successful installation:

1. ✅ Explore the application
2. ✅ Create some test events
3. ✅ Register for events
4. ✅ Check the dashboard
5. ✅ Read the [API Documentation](./API_DOCUMENTATION.md)

## Need Help?

If you encounter any issues:
1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure MongoDB is running
4. Review the [README.md](./README.md) for additional information

Happy coding! 🎉
