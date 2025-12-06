import request from 'supertest';
import app from '../src/app.js';
import { sequelize, User } from '../src/models/index.js';

beforeAll(async () => {
  await sequelize.sync({ force: true }); // recreate tables
});

afterAll(async () => {
  await sequelize.close();
});

describe('Users CRUD', () => {
  let userId;

  test('create user successfully', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Alice', email: 'alice@example.com' });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Alice');
    userId = res.body.id;
  });

  test('fetch user by id', async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(userId);
    expect(res.body.name).toBe('Alice');
  });

  test('fetch all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('validation error on missing email', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Bob' });

    expect(res.statusCode).toBe(400);
  });
});
