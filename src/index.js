import express from 'express';
import dotenv from 'dotenv';
import usersRoutes from './routes/users.js';
import postsRoutes from './routes/posts.js';
import commentsRoutes from './routes/comments.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(logger);

// Mount routes
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);

// Error handler (always last)
app.use(errorHandler);

export default app;
