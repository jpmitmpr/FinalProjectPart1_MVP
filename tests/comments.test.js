import request from 'supertest';
import app from '../src/app.js';
import { sequelize, User, Post } from '../src/models/index.js';

let post, user;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  user = await User.create({ name: 'Alice', email: 'alice@example.com' });
  post = await Post.create({ title: 'Test Post', content: 'Content', userId: user.id });
});

afterAll(async () => {
  await sequelize.close();
});

describe('POST /api/comments', () => {
  test('create comment success', async () => {
    const res = await request(app)
      .post('/api/comments')
      .send({ content: 'Nice', userId: user.id, postId: post.id });

    expect(res.statusCode).toBe(201);
    expect(res.body.content).toBe('Nice');
  });

  test('400 when invalid postId', async () => {
    const res = await request(app)
      .post('/api/comments')
      .send({ content: 'Bad', userId: user.id, postId: 9999 });

    expect(res.statusCode).toBe(404);
  });
});
