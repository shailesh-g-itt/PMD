import js from '@eslint/js';
import babelParser from '@babel/eslint-parser';
import lwcPlugin from '@lwc/eslint-plugin-lwc';

/** @type {import("eslint").FlatConfig[]} */
export default [
  js.configs.recommended,

  {
    files: ['**/*.{js,html,css}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module'
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
    files: ['force-app/main/default/lwc/**/*.{js,html}'],
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
      }
    },
    rules: {
      'lwc/no-api-reassignments': 'error',
      'lwc/no-async-await': 'warn',
      'lwc/no-document-query': 'error',
      'lwc/no-inner-html': 'error'
    }
  }
];
