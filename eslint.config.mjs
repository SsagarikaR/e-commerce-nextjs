import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import hub from '@mindfiredigital/eslint-plugin-hub';
import { vitest } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = {
  extends: [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
  ],
  languageOptions: {
    globals: {
      ...vitest.environments.env.globals
  },
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
  },
  plugins: {
    hub: hub,
    vitest
  },
  rules: {
    'hub/vars-camelcase': 'error',
    'hub/class-pascalcase': 'error',
    'hub/file-kebabcase': 'error',
    'hub/function-camelcase': 'error',
    'hub/function-descriptive': 'warn',
  },
};

export default eslintConfig;
