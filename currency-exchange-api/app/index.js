const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
// const morgan = require('morgan');

// const { env } = require('../config');
// const logger = require('../config/logger');
// const { passport } = require('./middlewares');
const routes = require('./routes');

const app = express();
// console.log(`setting up enviroment ${env}...`);
// console.log('configuring express...');
// app.use(morgan('combined', { stream: logger.stream }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// Put here route middlewares
console.log('setting up routes...');
// app.use(passport.initialize());
app.use('/api', routes);

// The 404 Route (ALWAYS Keep this as the last route)
app.all('/*', (req, res) => {
  res.status(404).jsonp({
    code: 404,
    message: 'Not Found',
    description: 'sorry, requested route was not found',
  });
});

module.exports = app;
