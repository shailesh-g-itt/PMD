import js from '@eslint/js';
import babelParser from '@babel/eslint-parser';
import lwcPlugin from '@lwc/eslint-plugin-lwc';

/** @type {import("eslint").FlatConfig[]} */
export default [
  js.configs.recommended,

  {
    files: ['**/*.{js,css}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly'
      }
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'comma-dangle': [
        'error',
        {
          arrays: 'never',
          objects: 'never',
          imports: 'never',
          exports: 'never',
          functions: 'never'
        }
      ]
    }
  },

  {
    files: ['force-app/main/default/lwc/**/*.js'],
    plugins: {
      lwc: lwcPlugin
    },
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          plugins: [['@babel/plugin-syntax-decorators', { legacy: true }]]
        }
      },
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly'
      }
    },
    rules: {
      'lwc/no-api-reassignments': 'error',
      'lwc/no-async-await': 'warn'
    }
  },

  {
    files: ['**/__tests__/**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        jest: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly'
      }
    }
  }
];
