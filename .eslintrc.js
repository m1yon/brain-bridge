/* eslint-env node */
module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "next/core-web-vitals",
    "plugin:tailwindcss/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  "plugins": ["tailwindcss", "@typescript-eslint"],
  "root": true,
  "settings": {
    "tailwindcss": {
      "callees": ["cn"],
    }
  }
}
