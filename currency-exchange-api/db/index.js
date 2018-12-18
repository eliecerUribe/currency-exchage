const mongoose = require('mongoose');

const Currency = require('./models/currency');
const User = require('./models/user');

mongoose.Promise = global.Promise;

const mongoStart = uri => new Promise((resolve, reject) => mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .then(() => resolve())
  .catch(error => reject(error)));

module.exports = {
  mongoStart,
  Currency,
  User,
};
