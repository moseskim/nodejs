const path = require('path');
const fs = require('fs');
// package.hsib이 1계층 위로 되었으므로 상태 경로에서 1단계 위로 돌아간다
const packageStr = fs.readFileSync(path.resolve(__dirname, '../package.json'), { encoding: 'utf-8' });
const package = JSON.parse(packageStr);

exports.getPackageName = () => {
  return package.name;
};