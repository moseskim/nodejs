const redisConfig = {
  port: 6379,
  host: 'localhost',
  password: process.env.REDIS_PASSWORD
};

exports.redisConfig = redisConfig;