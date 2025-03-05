export default {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "google", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module", // This ensures the parser treats the code as an ES module
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {},
  settings: {
    react: {
      version: "latest", // This ensures that ESLint uses the correct React version
    },
  },
};
