module.exports = {
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.vue', '.js', '.json'],
      },
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:vue/vue3-essential'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-new': 'off',
  },
};
