// handlers/users.test.js
const mockRedisGet = jest.fn();
const mockRedisScanStream = jest.fn();
jest.mock('../lib/redis', () => {
  return {
    getClient: jest.fn().mockImplementation(() => {
      return {
        get: mockRedisGet,
        scanStream: mockRedisScanStream
      };
    })
  };
});

const { getUser, getUsers } = require('./users');

beforeEach(() => {
  mockRedisGet.mockClear();
  mockRedisScanStream.mockClear();
});

test('getUser', async () => {
  mockRedisGet.mockResolvedValue(JSON.stringify({ id: 1, name: 'alpha', foo: 'bar' }));

  const reqMock = { params: { id: 1 } };
  const resMock = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  await getUser(reqMock, resMock);

  // resMock 호출 테스트
  expect(resMock.status).toHaveBeenCalledTimes(1);
  expect(resMock.status).toHaveBeenCalledWith(200);
  expect(resMock.json).toHaveBeenCalledTimes(1);
  expect(resMock.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1, name: 'alpha' }));
  // expect(resMock.json).toHaveBeenCalledWith({ id: 1, name: 'alpha' });

  // 목 호출 횟수 테스트
  expect(mockRedisGet).toHaveBeenCalledTimes(1);
  expect(mockRedisGet.mock.calls.length).toStrictEqual(1);

  // 목 인수 테스트
  const [arg1] = mockRedisGet.mock.calls[0];
  expect(arg1).toStrictEqual('users:1');
});

test('getUser 실패', async () => {
  mockRedisGet.mockRejectedValue(new Error('something error'));

  const reqMock = { params: { id: 1 } };
  const resMock = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis()
  };

  await getUser(reqMock, resMock);

  // resMock 호출 테스트
  expect(resMock.status).toHaveBeenCalledTimes(1);
  expect(resMock.status).toHaveBeenCalledWith(500);
  expect(resMock.send).toHaveBeenCalledTimes(1);
  expect(resMock.send).toHaveBeenCalledWith('internal error');
});

test('getUsers', async () => {
  const streamMock = {
    async* [Symbol.asyncIterator]() {
      yield ['users:1', 'users:2'];
      yield ['users:3', 'users:4'];
    }
  };
  mockRedisScanStream.mockReturnValueOnce(streamMock);
  mockRedisGet.mockImplementation((key) => {
    switch (key) {
      case 'users:1':
        return Promise.resolve(JSON.stringify({ id: 1, name: 'alpha' }));
      case 'users:2':
        return Promise.resolve(JSON.stringify({ id: 2, name: 'bravo' }));
      case 'users:3':
        return Promise.resolve(JSON.stringify({ id: 3, name: 'charlie' }));
      case 'users:4':
        return Promise.resolve(JSON.stringify({ id: 4, name: 'delta' }));
    }
    return Promise.resolve(null);
  });

  const reqMock = { };

  const res = await getUsers(reqMock);

  expect(mockRedisScanStream).toHaveBeenCalledTimes(1);
  expect(mockRedisGet).toHaveBeenCalledTimes(4);
  expect(mockRedisGet.mock.calls.length).toStrictEqual(4);
  expect(res.users.length).toStrictEqual(4);
  expect(res.users).toStrictEqual([
    { id: 1, name: 'alpha' },
    { id: 2, name: 'bravo' },
    { id: 3, name: 'charlie' },
    { id: 4, name: 'delta' }
  ]);
});
