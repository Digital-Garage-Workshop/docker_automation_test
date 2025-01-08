import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

// Get the current directory

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    compilerOptions: {
      strictNullChecks: true,
    },
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],

    languageOptions: {
      globals: globals.browser,
    },

    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];
