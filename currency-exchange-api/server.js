const http = require('http');

const app = require('./app');
const {
  db,
  env,
  port,
} = require('./config');
const dbInstance = require('./db');

const server = http.createServer(app);

require('app-module-path').addPath(__dirname);

dbInstance
  .mongoStart(db)
  .then(() => console.log('Connection to MongoDb succesfully established...'))
  .then(() => {
    server.listen(port, () => {
      console.log(`${env} server up and running on port: ${port}`);
    });
  })
  .catch(error => console.log(error));

module.exports = server;
