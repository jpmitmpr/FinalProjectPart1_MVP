import { Comment, User, Post } from '../models/index.js';

export const create = async (req, res, next) => {
  try {
    const { content, userId, postId } = req.body;
    if (!content || !userId || !postId) return res.status(400).json({ error: 'Content, userId, and postId are required' });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const comment = await Comment.create({ content, userId, postId });
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};