const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let app;
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  process.env.DATABASE_URL = mongoServer.getUri();
  // require app after setting DATABASE_URL so connectDB connects to memory server
  app = require('../index');
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
});

describe('Game endpoints', () => {
  test('GET /api/game/worlds returns array (empty initially)', async () => {
    const res = await request(app).get('/api/game/worlds').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/game/bosses returns array (empty initially)', async () => {
    const res = await request(app).get('/api/game/bosses').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
