module.exports = {
  parser: "@typescript-eslint/parser",
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb",
    "airbnb-typescript",
    "plugin:playwright/playwright-test",
    "next/core-web-vitals",
    "prettier",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "react/require-default-props": "off",
    "no-plusplus": "off",
  },
};
