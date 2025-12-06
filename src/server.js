import app from './app.js';
import sequelize from './models/index.js';

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }) // make sure DB exists
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Failed to start server', err));
