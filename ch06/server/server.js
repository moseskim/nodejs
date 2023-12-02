// server.js
const path = require('path');
const express = require('express');
const redis = require('./lib/redis');
const usersHandler = require('./handlers/users');
// 서버용 인스턴스를 작성
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

// GET '/'(톱) 접근 시 동작
app.get('/', (req, res) => {
  res.render(path.join(__dirname, 'views', 'index.ejs'));
});

app.get('/err', (req, res) => {
  throw new Error('동기적인 에러');
  console.log('err 라우트');
  res.status(200).send('err 라우트');
});

// GET '/user/:id'에 일치하는 GET의 동작
app.get('/user/:id', async (req, res) => {
  res.status(200).send(req.params.id);
  /*
  try {
    const user = await usersHandler.getUser(req);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('internal error');
  }
  */
});

app.get('/users', async (req, res) => {
  try {
    const { users } = await usersHandler.getUsers(req);
    res.render(path.join(__dirname, 'views', 'users.ejs'), { users: users });
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

      // 포트: 8000에서 서버를 기동
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
