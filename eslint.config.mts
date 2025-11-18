import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import promisePlugin from "eslint-plugin-promise";
import securityPlugin from "eslint-plugin-security";
import sonarPlugin from "eslint-plugin-sonarjs";
import unicornPlugin from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/*.json",
      "**/*.md",
      "**/eslint-report.json",
      "**/.vscode/**",
      "**/.scannerwork/**",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: {
      sonarjs: sonarPlugin,
      import: importPlugin,
      promise: promisePlugin,
      unicorn: unicornPlugin,
      security: securityPlugin
    },
    languageOptions: { globals: globals.browser },
    rules: {
      // Complexity rules
      "complexity": ["error", { "max": 10 }],
      "max-lines": ["warn", 200],
      "max-depth": ["warn", 3],
      "max-params": ["warn", 3],
      "max-statements": ["warn", 15],
      "max-nested-callbacks": ["warn", 3],
      "max-lines-per-function": [
        "warn",
        { max: 60, skipComments: true }
      ],

      // Core ESLint rules
      "no-unused-vars": "error",
      "no-console": "warn",
      "no-warning-comments": ["warn", { "terms": ["todo", "fixme", "xxx"], "location": "anywhere" }],
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "warn",
      "no-magic-numbers": ["warn", { "ignore": [0, 1, -1], "ignoreArrayIndexes": true }],
      "eqeqeq": ["error", "always"],
      "no-shadow": "error",
      "promise/no-return-wrap": "error",
      "curly": ["error", "all"],
      "no-restricted-syntax": [
        "error",
        {
          "selector": "SwitchStatement",
          "message": "Switch statements are not allowed. Use if-else or lookup objects instead."
        }
      ],

      // SonarJS rules
      "sonarjs/cognitive-complexity": ["error", 15],
      "sonarjs/no-identical-functions": "warn",
      "sonarjs/no-duplicate-string": "warn",
      "sonarjs/no-small-switch": "warn",
      "sonarjs/no-nested-switch": "warn",
      "sonarjs/no-collapsible-if": "warn",
      "sonarjs/no-redundant-boolean": "warn",

      // TS rules
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" }
      ],

      // Import rules
      "import/no-unresolved": "off",
      "import/order": ["warn", { 
          "groups": ["builtin", "external", "internal", "parent", "sibling", "index"] ,
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always"
        }],
      "import/no-duplicates": "error",
      "import/no-unused-modules": "warn",

      // Promise rules
      "promise/always-return": "warn",
      "promise/catch-or-return": "error",
      "promise/no-nesting": "warn",

      // Unicorn rules (best practices)
      "unicorn/better-regex": "warn",
      "unicorn/catch-error-name": "warn",
      "unicorn/consistent-function-scoping": "warn",
      "unicorn/no-array-for-each": "warn",
      "unicorn/no-for-loop": "warn",
      "unicorn/prefer-array-some": "warn",
      "unicorn/prefer-modern-math-apis": "warn",
      "unicorn/prefer-string-slice": "warn",

      // Security rules
      "security/detect-object-injection": "warn",
      "security/detect-non-literal-regexp": "warn",
      "security/detect-unsafe-regex": "error"
    }
  },
];
