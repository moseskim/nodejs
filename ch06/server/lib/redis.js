// lib/redis.js
const { redisConfig } = require('../config');
const Redis = require('ioredis');

let redis = null;

exports.getClient = () => {
  return redis;
};

const connect = () => {
  if (!redis) {
    redis = new Redis(redisConfig)
  }
  return redis;
};

exports.connect = connect;

const init = async () => {
  await Promise.all([
    redis.set('users:1', JSON.stringify({ id: 1, name: 'alpha' })),
    redis.set('users:2', JSON.stringify({ id: 2, name: 'bravo' })),
    redis.set('users:3', JSON.stringify({ id: 3, name: 'charlie' })),
    redis.set('users:4', JSON.stringify({ id: 4, name: 'delta' }))
  ]);
};

exports.init = init;
