import { Post, User } from '../models/index.js';

export const create = async (req, res, next) => {
  try {
    const { title, content, userId } = req.body;
    if (!title || !content || !userId) return res.status(400).json({ error: 'Title, content, and userId are required' });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const post = await Post.create({ title, content, userId });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (err) {
    next(err);
  }
};
