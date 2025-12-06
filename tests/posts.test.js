import request from 'supertest';
import app from '../src/app.js';
import { sequelize, User, Post } from '../src/models/index.js';

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await User.create({ name: 'Alice', email: 'alice@example.com' });
});

afterAll(async () => {
  await sequelize.close();
});

describe('POST /api/posts', () => {
  test('creates a post successfully', async () => {
    const user = await User.findOne();
    const res = await request(app)
      .post('/api/posts')
      .send({ title: 'My Post', content: 'Content here', userId: user.id });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('My Post');
  });

  test('returns 400 for missing userId', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({ title: 'No User', content: 'No userId' });

    expect(res.statusCode).toBe(400);
  });
});
