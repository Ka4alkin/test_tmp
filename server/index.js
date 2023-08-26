require('dotenv').config();
require('./models/actor-movie');
const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const userRoutes = require('./routes/userRoutes');
const actorRoutes = require('./routes/actorsRoutes');
const movieRoutes = require('./routes/movieRoutes');
const notFound = require('./middlewares/not-found');
const errorHandler = require('./middlewares/error-handler');

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '✨👋🌎🌍🌏✨',
  });
});

app.use('/auth', userRoutes);
app.use('/actor', actorRoutes);
app.use('/movie', movieRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
