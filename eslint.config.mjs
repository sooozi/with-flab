import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      env: {
        browser: true, // 브라우저 환경
        es2021: true,  // ECMAScript 2021
      },
      parser: tseslint.parsers.TypeScriptParser, // TypeScript 파서 설정 (필요한 경우)
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];