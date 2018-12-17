const http = require('http');
// const fse = require('fs-extra');

const app = require('./app');
const {
  db,
  env,
  port,
//  logs,
} = require('./config');
const dbInstance = require('./db');
// const logger = require('./config/logger');

const server = http.createServer(app);

require('app-module-path').addPath(__dirname);

// console.log('ensuring log file exists...');
// fse.ensureFileSync(`${__dirname}${logs.filePath}`);

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
