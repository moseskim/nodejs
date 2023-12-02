import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { useUsers } from './Users.hooks';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


test('users 배열이 API로부터 얻어진다', async () => {
  // API의 목
  server.use(
    rest.get('/api/users', (req, res, ctx) => {
      return res(ctx.json({ users: [{ name: 'alpha' }, { name: 'bravo' }] }));
    })
  );

  const { result } = renderHook(() => useUsers());

  // API 호출 종료까지 대기 수신한다
  await waitFor(() => {
    return expect(result.current.users).toStrictEqual(['alpha', 'bravo']);
  });
});
