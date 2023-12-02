FROM node:14

CMD ["node", "-e", "http.createServer((req, res) => res.end('OK')).listen(3000); process.on('SIGINT', () => process.exit(0))"]