import express from 'express';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import usersRoutes from './routes/users.js';
import postsRoutes from './routes/posts.js';
import commentsRoutes from './routes/comments.js';
import authRoutes from './routes/auth.js'; // ✅ ADD THIS LINE

const app = express();

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/auth', authRoutes); // ✅ ADD THIS LINE
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);

// Error handler
app.use(errorHandler);

export default app;
