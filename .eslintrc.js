module.exports = {
  parser: "@typescript-eslint/parser",
  root: true,
  parser: "@typescript-eslint/parser",
  extends: ["airbnb", "airbnb-typescript", "next/core-web-vitals", "prettier"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "react/require-default-props": "off",
  },
};
