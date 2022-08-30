module.exports = {
  extends: ['eslint:recommended'],
  parserOptions: {
    sourceType: 'script',
    ecmaVersion: '2022',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-var': 2,
  },
  env: {
    es2022: true,
    browser: true,
    // amd: true,
    node: true,
  },
}
