// handlers/users.js
const redis = require('../lib/redis');

const getUser = async (req, res) => {
  try {
    const key = `users:${req.params.id}`;
    const val = await redis.getClient().get(key);
    const user = JSON.parse(val);
    // return user;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send('internal error');
  }
};

exports.getUser = getUser;

const getUsers = async (req) => {
  const stream = redis.getClient().scanStream({
    match: 'users:*',
    count: 2
  });

  const users = [];
  for await (const resultKeys of stream) {
    for (const key of resultKeys) {
      const value = await redis.getClient().get(key);
      const user = JSON.parse(value);
      users.push(user);
    }
  }

  return { users: users };
};

exports.getUsers = getUsers;
