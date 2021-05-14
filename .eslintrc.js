module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      configFile: './babel.config.json',
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  // extends: ['eslint:recommended', 'google'],
  rules: {
    'semi': 'off',
    'comma-dangle': 'off',
    'require-jsdoc': 'off',
    'indent': 'off',
    'linebreak-style': ['error', 'windows'],
    'no-trailing-spaces': 0,
    'max-len': ["error", { "code": 120 }]
  }
}
