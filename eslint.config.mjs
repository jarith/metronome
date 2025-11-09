import love from 'eslint-config-love'
import expo from 'eslint-config-expo'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'

const commonRules = {
  indent: 'off',
  'comma-dangle': 'off',
  'one-var': 'off',
  'sort-keys': 'off',
  'sort-imports': 'off',
  'no-duplicate-imports': 'off',
  'prefer-promise-reject-errors': 'off',
  'prefer-named-capture-group': 'off',
  'no-ternary': 'off',
  'id-length': 'off',
  'max-lines-per-function': 'off',
  'max-statements': 'off',
  'no-continue': 'off',
  'capitalized-comments': 'off',
  'no-undefined': 'off',
  'arrow-body-style': 'off',
  'max-classes-per-file': 'off',
  'no-magic-numbers': 'off',
}

const tsEslintRulesReplacements = {
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': 'error',
  'no-shadow': 'off',
  '@typescript-eslint/no-shadow': 'error',
}

const tsEslintRules = {
  '@typescript-eslint/indent': 'off',
  '@typescript-eslint/promise-function-async': 'off',
  '@typescript-eslint/return-await': 'off',
  '@typescript-eslint/space-before-function-paren': 'off',
  '@typescript-eslint/strict-boolean-expressions': 'off',
  '@typescript-eslint/comma-dangle': 'off',
  '@typescript-eslint/no-non-null-assertion': 'off',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'error',
  '@typescript-eslint/restrict-template-expressions': 'off',
  '@typescript-eslint/no-var-requires': 'off',
  '@typescript-eslint/no-confusing-void-expression': 'off',
  '@typescript-eslint/no-floating-promises': 'warn',
  '@typescript-eslint/prefer-readonly-parameter-types': 'off',
  '@typescript-eslint/naming-convention': 'off',
  '@typescript-eslint/no-magic-numbers': 'off',
  '@typescript-eslint/prefer-promise-reject-errors': 'off',
  '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',
  '@typescript-eslint/no-require-imports': 'off',
  '@typescript-eslint/explicit-member-accessibility': 'off',
  '@typescript-eslint/no-unnecessary-condition': 'off',
  '@typescript-eslint/prefer-reduce-type-parameter': 'off',
  '@typescript-eslint/init-declarations': 'off',
  '@typescript-eslint/no-unsafe-assertion': 'off',
  '@typescript-eslint/no-unsafe-type-assertion': 'off',
  '@typescript-eslint/no-unsafe-argument': 'off',
  '@typescript-eslint/consistent-type-imports': [
    'error',
    {
      prefer: 'type-imports',
      disallowTypeAnnotations: true,
      fixStyle: 'separate-type-imports',
    },
  ],
}

export default [
  {
    ignores: [
      'node_modules/**',
      'ios/**',
      'android/**',
      '.bundle/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '*.config.js',
      'babel.config.js',
      'metro.config.js',
      '.yarn/**',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    // Explicitly configure TypeScript parser
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      ...expo.plugins,
      ...love.plugins,
      import: importPlugin,
    },
    rules: {
      ...expo.rules,
      ...love.rules,
      ...commonRules,
      ...tsEslintRules,
      ...tsEslintRulesReplacements,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: true,
      },
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    ...expo,
  },
]
