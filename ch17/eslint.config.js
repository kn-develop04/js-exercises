// eslint.config.js
import googleConfig from "eslint-config-google";

export default [
  googleConfig,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
      globals: {
        browser: true,
        node: true,
        es2020: true,
      },
    },
    ignores: ["format_sample.js"],
    rules: {
      "require-jsdoc": "off",
      "valid-jsdoc": "off",
    },
  },
];
