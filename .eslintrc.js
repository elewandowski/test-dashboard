module.exports = {
  extends: ['eslint:recommended'],
  parserOptions: {
    sourceType: 'script',
    ecmaVersion: 8,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-var': 2,
  },
  env: {
    es6: true,
    browser: true,
    // amd: true,
    node: true,
  },
}
