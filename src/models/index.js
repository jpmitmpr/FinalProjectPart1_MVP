import { Sequelize } from 'sequelize';
import UserModel from './user.js';
import PostModel from './post.js';
import CommentModel from './comment.js';

const sequelize = new Sequelize('sqlite::memory:', {
  logging: false, // hides SQL logs
});

// Initialize models
const User = UserModel(sequelize);
const Post = PostModel(sequelize);
const Comment = CommentModel(sequelize);

// Set up associations
User.hasMany(Post, { foreignKey: 'userId', onDelete: 'CASCADE' });
Post.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

// Export
export { sequelize, User, Post, Comment };
export default sequelize;