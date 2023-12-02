const path = require('path')
const { readMarkdownFileSync } = require('./file');

test('readMarkdownFileSync', () => {
  // readMarkdownFileSync('test.md');
  const markdown = readMarkdownFileSync(path.resolve(__dirname, '../fixtures/test.md'));
  expect(markdown).toStrictEqual('**bold**');
});
