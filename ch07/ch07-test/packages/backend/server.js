// server.js
const path = require('path');
const express = require('express');
const redis = require('./lib/redis');
const usersHandler = require('./handlers/users');
const app = express();

app.use((req, res, next) => {
  try {
    console.log(Date.now(), req.method, req.url);
    next();
  } catch (err) {
    next(err);
  }
});

app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render(path.join(__dirname, 'views', 'index.ejs'));
});

app.get('/err', (req, res, next) => {
  next(new Error('미들웨어에서의 에러'));
}, (req, res) => {
  console.log('에러 라우트');
  res.status(200).send('에러 라우트');
});

app.get('/user/:id', async (req, res) => {
  try {
    const user = await usersHandler.getUser(req);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('internal error');
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await usersHandler.getUsers(req);
    // res.status(200).json(users);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('internal error');
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

redis.connect()
  .once('ready', async () => {
    try {
      await redis.init();

      app.listen(8000, () => {
        console.log('start listening');
      });
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  })
  .on('error', (err) => {
    console.error(err);
    process.exit(1);
  });
