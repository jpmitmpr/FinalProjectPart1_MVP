import request from 'supertest';
import app from '../src/app.js';
import { sequelize } from '../src/models/index.js';

describe('Authentication', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  let userToken;
  let adminToken;
  let userId;

  test('register normal user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'user@test.com',
        password: 'password123'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe('user@test.com');
    userId = res.body.id;
  });

  test('register admin user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Admin User',
        email: 'admin@test.com',
        password: 'password123',
        role: 'admin'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.role).toBe('admin');
  });

  test('login normal user and receive JWT', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'user@test.com',
        password: 'password123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    userToken = res.body.token;
  });

  test('login admin user and receive JWT', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'password123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    adminToken = res.body.token;
  });

  test('deny update without token', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send({ name: 'Hacker' });

    expect(res.statusCode).toBe(401);
  });

  test('allow user to update own profile', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ name: 'Updated User' });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Updated User');
  });

  test('deny user deleting another user', async () => {
    const res = await request(app)
      .delete(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(403);
  });

  test('allow admin to delete user', async () => {
    const res = await request(app)
      .delete(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(204);
  });
});
