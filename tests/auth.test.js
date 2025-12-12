const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let app;
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  process.env.DATABASE_URL = mongoServer.getUri();
  process.env.JWT_SECRET = 'testsecret';
  // require app after setting DATABASE_URL so connectDB connects to memory server
  app = require('../index');
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
});

describe('Auth endpoints', () => {
  test('signup -> login -> me flow', async () => {
    const userPayload = { name: 'Test', email: 'test@example.com', password: 'password' };

    const signupRes = await request(app).post('/api/auth/signup').send(userPayload).expect(201);
    expect(signupRes.body).toHaveProperty('token');
    expect(signupRes.body).toHaveProperty('user');

    const loginRes = await request(app).post('/api/auth/login').send({ email: userPayload.email, password: userPayload.password }).expect(200);
    expect(loginRes.body).toHaveProperty('token');

    const token = loginRes.body.token;
    const meRes = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${token}`).expect(200);
    expect(meRes.body).toHaveProperty('user');
    expect(meRes.body.user.email).toBe(userPayload.email);
  });
});
