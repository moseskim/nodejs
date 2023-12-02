const { request } = require('undici');
const path = require('path')
const fs = require('fs').promises
const express = require('express')

const app = express()

app.get('/', async (req, res, next) => {
  try {
    const html = await fs.readFile(path.join(__dirname, 'index.html'), {
      encode: 'utf8'
    })

    res.status(200).send(html)
  } catch (e) {
    next(e)
  }
})

const server = app.listen(8000, async () => {
  console.log('listen')
  const promises = [];
  for (let i = 0; i < 10; i++) {
    promises.push(request('http://localhost:8000'));
  }
  await Promise.all(promises)
  server.close()
})