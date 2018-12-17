module.exports = {
  app: 'belatrix-test',
  env: process.env.NODE_ENV,
  secret: 'mYsEcRet',
  jwtConfig: {
    secret: process.env.JWT_SECRET,
    expireTime: process.env.JWT_EXPIRATION_MIN,
  },
  db: process.env.MONGODB_URI,
  port: Number(process.env.PORT),
  logs: {
    host: process.env.LOG_HOST,
    port: Number(process.env.LOG_PORT),
    filePath: process.env.LOG_FILE_PATH || 'belatrix-test.log',
  },
};
