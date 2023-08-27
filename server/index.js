require('dotenv').config();
require('./src/models/actors-movies-model');
const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const usersRoutes = require('./src/routes/users-routes');
const actorsRoutes = require('./src/routes/actors-routes');
const moviesRoutes = require('./src/routes/movies-routes');
const sessionsRoutes = require('./src/routes/sessions-routes');
const notFound = require('./src/middlewares/not-found-middleware');
const errorHandler = require('./src/middlewares/error-handler-middleware');
const cors = require('cors');


app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(cors());

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

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
