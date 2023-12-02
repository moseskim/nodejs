const fs = require('fs');

// 인수로 파일의 절대 경로를 받는다
exports.readMarkdownFileSync = (path) => {
  // 지정된 markdown 파일을 읽는다
  const markdownStr = fs.readFileSync(path, { encoding: 'utf-8' });

  return markdownStr;
};

// 지정한 경로에 HTML을 쓴다
exports.writeHtmlFileSync = (path, html) => {
  fs.writeFileSync(path, html, { encoding: 'utf-8' });
};
