// .eslintrc.js
module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: ["eslint:recommended", "plugin:vue/vue3-essential","plugin:prettier/recommended",],
    overrides: [],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: ["vue"],
    rules: {
      indent: ["error", 2],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "double"],
      semi: ["error", "always"],
    },
  };
