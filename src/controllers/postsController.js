import { Post } from '../models/index.js';

export const create = async (req, res, next) => {
  try {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const post = await Post.create({ title, content, userId });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};


export const getAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const where = {};
    if (req.query.userId) {
      where.userId = req.query.userId;
    }

    const { count, rows } = await Post.findAndCountAll({
      where,
      limit,
      offset
    });

    res.json({
      total: count,
      page,
      pages: Math.ceil(count / limit),
      data: rows
    });
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    await post.update(req.body);
    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    await post.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
