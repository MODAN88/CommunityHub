const request = require('supertest');
const app = require('../server/index');
const mongoose = require('mongoose');

describe('API Tests', () => {
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/communityhub-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('Auth Routes', () => {
    test('POST /api/auth/register - should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: `test${Date.now()}@example.com`,
          password: 'password123'
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
    });

    test('POST /api/auth/login - should login existing user', async () => {
      // First register a user
      const email = `test${Date.now()}@example.com`;
      await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: email,
          password: 'password123'
        });

      // Then login
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: email,
          password: 'password123'
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
    });
  });

  describe('Event Routes', () => {
    test('GET /api/events - should get all events', async () => {
      const res = await request(app).get('/api/events');
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('data');
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('Health Check', () => {
    test('GET /api/health - should return server status', async () => {
      const res = await request(app).get('/api/health');
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('message', 'Server is running');
    });
  });
});
