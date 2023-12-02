import { createServer } from 'http';

const server = createServer();

server.on('request', (req, res) => {
  setTimeout(() => {
    res.end('hello')
  }, 100);
});

server.listen(8000);