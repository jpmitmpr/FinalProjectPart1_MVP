import request from 'supertest';
import app from '../src/app.js';
import { sequelize, User, Post } from '../src/models/index.js';

describe('Advanced Posts Endpoints', () => {
  let user;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    user = await User.create({
      name: 'Post Owner',
      email: 'posts@test.com'
    });

    await Post.bulkCreate([
      { title: 'Post 1', content: 'Content 1', userId: user.id },
      { title: 'Post 2', content: 'Content 2', userId: user.id },
      { title: 'Post 3', content: 'Content 3', userId: user.id }
    ]);
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('paginate posts', async () => {
    const res = await request(app)
      .get('/api/posts?page=1&limit=2');

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(2);
    expect(res.body.total).toBe(3);
  });

  test('filter posts by userId', async () => {
    const res = await request(app)
      .get(`/api/posts?userId=${user.id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(3);
  });
});
