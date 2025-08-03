module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-native'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    'react-native/react-native': true,
    jest: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // React & React Native
    'react/prop-types': 'off', // Since we use TypeScript
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    'react/display-name': 'off', // Not needed for component library
    'react-native/no-unused-styles': 'warn', // Warning only for dynamic styles
    'react-native/split-platform-components': 'error',
    'react-native/no-inline-styles': 'off', // Needed for dynamic values
    'react-native/no-color-literals': 'off', // Needed for themes
    'react-native/no-raw-text': ['error', { skip: ['Text'] }],
    'react-native/sort-styles': 'error',
    'react-native/no-single-element-style-arrays': 'error',
    
    // React Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn', // Warn only since we sometimes need to deviate
    
    // TypeScript
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true,
      caughtErrorsIgnorePattern: '^_'
    }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-inferrable-types': 'warn',
    
    // General
    'no-prototype-builtins': 'off', // We use hasOwnProperty checks
    'no-unused-expressions': ['error', { 
      allowShortCircuit: true,
      allowTernary: true 
    }],
  },
  ignorePatterns: ['dist/**/*', 'node_modules/**/*'],
}
