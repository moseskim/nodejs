module.exports = {
  extends: 'eslint:recommended',
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    quotes: ['error', 'single']
  }
};
