#!/usr/bin/env node
const path = require('path');
const { marked } = require('marked');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { getPackageName } = require('./lib/name');
const { readMarkdownFileSync, writeHtmlFileSync } = require('./lib/file')

const { argv } = yargs(hideBin(process.argv))
  .option('name', {
    describe: 'CLI 이름을 표시'
  })
  .option('file', {
    describe: 'Markdown 파일 경로'
  })
  .option('out', {
    describe: 'html file',
    default: 'article.html'
  });

if (argv.name) {
  const name = getPackageName()
  console.log(name);
  process.exit(0);
}

const markdownStr = readMarkdownFileSync(path.resolve(__dirname, argv.file));
const html = marked(markdownStr);

writeHtmlFileSync(path.resolve(__dirname, argv.out), html);
