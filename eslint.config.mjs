// eslint.config.mjs
import globals from "globals";
import pluginJs from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const airbnbFlat = compat.extends("airbnb-base");

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["dist/", "*.mjs"],
  },

  {
    files: ["webpack.config.js"],
    languageOptions: {
      globals: globals.node,
    },
  },

  {
    languageOptions: {
      globals: globals.browser,
    }
  },

  {
    ...pluginJs.configs.recommended,
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...airbnbFlat[0].rules
    }
  },
];
