require('dotenv').config();
require('./models/actors-movies-model');
const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const usersRoutes = require('./routes/users-routes');
const actorsRoutes = require('./routes/actors-routes');
const moviesRoutes = require('./routes/movies-routes');
const sessionsRoutes = require('./routes/sessions-routes');
const notFound = require('./middlewares/not-found-middleware');
const errorHandler = require('./middlewares/error-handler-middleware');

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '✨👋🌎🌍🌏✨',
  });
});

app.use('/users', usersRoutes);
app.use('/sessions', sessionsRoutes);
app.use('/actors', actorsRoutes);
app.use('/movies', moviesRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
