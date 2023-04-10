const ESLINT_WARNING = 1;
const ESLINT_ERROR = 1;

module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  extends: [
    "plugin:vue/strongly-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "prettier"
  ],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": ESLINT_ERROR,
    "vue/no-multiple-template-root": "off", // not needed for vue 3
    "@typescript-eslint/ban-ts-comment": ESLINT_WARNING
  },
  ignorePatterns: [
    "vite-env.d.ts"
  ]
};
