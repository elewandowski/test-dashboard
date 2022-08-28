module.exports = {
    extends: ['eslint:recommended'],
    parserOptions: {
        sourceType: 'script',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'no-var': 2,
    },
    env: {
        es6: true,
        browser: true,
        // amd: true,
        node: true,
    },
}
