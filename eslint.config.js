import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import * as parserVue from 'vue-eslint-parser'
import configPrettier from '@vue/eslint-config-prettier'
import configTypeScript from '@vue/eslint-config-typescript'
import pluginImport from 'eslint-plugin-import'
import pluginUnusedImports from 'eslint-plugin-unused-imports'
import { includeIgnoreFile } from '@eslint/compat'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,jsx,ts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/node_modules/**'],
  },

  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  ...configTypeScript(),
  configPrettier,

  {
    name: 'app/base-rules',
    plugins: {
      'import': pluginImport,
      'unused-imports': pluginUnusedImports,
    },
    rules: {
      // 禁用默认的 no-unused-vars 规则
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      
      // 使用 unused-imports 插件来处理未使用的导入
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // Import 相关规则
      'import/no-unused-modules': [
        'error',
        {
          unusedExports: true,
          src: ['src/**/*.{js,jsx,ts,tsx,vue}'],
          ignoreExports: ['src/main.ts', 'src/App.vue'],
        },
      ],
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },

  {
    name: 'app/vue-rules',
    files: ['**/*.vue'],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
      },
    },
    rules: {
      // Vue 特定规则
      'vue/no-unused-vars': 'error',
      'vue/no-unused-components': 'error',
      'vue/no-unused-refs': 'error',
      'vue/script-setup-uses-vars': 'error',
    },
  },

  {
    name: 'app/typescript-rules',
    files: ['**/*.{ts,tsx,mts}'],
    rules: {
      // TypeScript 特定规则
      '@typescript-eslint/no-unused-expressions': 'error',
    },
  },
]