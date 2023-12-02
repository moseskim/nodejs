import { createServer } from 'http';
import { on } from 'events';
import { setTimeout } from 'timers/promises';

// request 이벤트를 for ... await로 받도록 한다
const req = on(createServer().listen(8000), 'request');

for await (const [, res] of req) {
  // 무언가의 비동기 처리
  await setTimeout(100);
  res.end('hello');
}
