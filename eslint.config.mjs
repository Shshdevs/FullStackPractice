import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import jest from 'eslint-plugin-jest'
import node from 'eslint-plugin-node'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default [
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.vite/**', '**/coverage/**', '**/*.config.js'],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  prettier,

  {
    plugins: {
      import: importPlugin,
      node,
    },

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },

    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts', '.tsx'],
        },
      },
    },

    rules: {
      'no-new': 'off',

      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: false,
            orderImportKind: 'asc',
          },
        },
      ],

      'space-infix-ops': 'error',
      'arrow-spacing': ['error', { before: true, after: true }],
      'space-before-blocks': 'error',
      'block-spacing': ['error', 'always'],
      
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/no-explicit-any':'off',
      
      curly: ['error', 'all'],

      'no-irregular-whitespace': [
        'error',
        {
          skipTemplates: true,
          skipStrings: true,
        },
      ],

      'node/no-process-env': 'error',

      'no-restricted-syntax': [
        'error',
        {
          selector: '[object.type=MetaProperty][property.name=env]',
          message: 'Use instead import { env } from "lib/env"',
        },
      ],
    },
  },

  {
    files: ['backend/**/*.ts'],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './backend/tsconfig.json',
        tsconfigRootDir: rootDir,
      },
    },

    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts', '.tsx'],
        },
      },
    },

    rules: {
      'import/no-restricted-paths': [
        'error',
        {
          basePath: rootDir,
          zones: [
            {
              target: './backend/src/**/!(*.integration.test.ts)',
              from: './backend/src/test',
              message: 'Import something from test dir only inside integration tests',
            },
          ],
        },
      ],

      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
          pathGroups: [
            {
              pattern: '{.,..}/**/env',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '{.,..}/**/test/integration',
              group: 'builtin',
              position: 'before',
            },
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: false,
            orderImportKind: 'asc',
          },
        },
      ],
    },
  },

  {
    files: ['backend/**/*.{test,spec}.ts', 'webapp/**/*.{test,spec}.{ts,tsx}'],

    plugins: {
      jest,
    },

    languageOptions: {
      globals: {
        ...jest.environments.globals.globals,
      },
    },

    settings: {
      jest: {
        version: 'detect',
      },
    },

    rules: {
      ...jest.configs.recommended.rules,
    },
  },

  {
    files: ['webapp/src/**/*.{ts,tsx}'],

    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './webapp/tsconfig.app.json',
        tsconfigRootDir: rootDir,
      },
    },

    rules: {
      ...reactHooks.configs.recommended.rules,

      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],

      'no-console': [
        'error',
        {
          allow: ['info', 'error', 'warn'],
        },
      ],

      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@fullstackpractice/backend/**',
                '!@fullstackpractice/backend/**/',
                '!@fullstackpractice/backend/**/input',
                '!@fullstackpractice/backend/src/utils/can',
              ],
              allowTypeImports: true,
              message: 'Only types and input schemas are allowed to be imported from backend workspace',
            },
          ],
        },
      ],
    },
  },

  {
    files: ['webapp/vite.config.ts'],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './webapp/tsconfig.node.json',
        tsconfigRootDir: rootDir,
      },
    },

    rules: {
      'no-console': [
        'error',
        {
          allow: ['info', 'error', 'warn'],
        },
      ],
    },
  },
]
