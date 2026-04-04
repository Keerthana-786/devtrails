/* eslint-disable no-undef */
module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  parserOptions: {
    "ecmaVersion": "latest",
    "sourceType": "module",
  },
  extends: [
    "eslint:recommended",
  ],
  globals: {
    require: "readonly",
    exports: "readonly",
    module: "readonly",
    process: "readonly",
  },
  rules: {
    "no-undef": "off",
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "off",
    "quotes": ["error", "double", {"allowTemplateLiterals": true}],
    "no-unused-vars": ["error", { "args": "none" }],
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
};
