import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import hub from "@mindfiredigital/eslint-plugin-hub";

// Define __filename and __dirname for compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create an instance of FlatCompat
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Flat configuration array
const eslintConfig = [
  // Config for JavaScript/TypeScript files
  {
    files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
    languageOptions: {
      globals: {
        // Add global variables if needed
      },
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      },
    },
    plugins: {
      hub: hub,
    },
    rules: {
      // Add custom rules here
    },
  },

  // Directly include Next.js and TypeScript rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Ignoring certain files
  {
    ignores: [
      "./test/*",
      "app/components/auth/SignInForm.tsx",
      "app/components/auth/SignUpForm.tsx",
    ],
  },
];

export default eslintConfig;
