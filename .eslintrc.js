module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended' // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    }
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  rules: {
    'react/prop-types': 0,
    '@typescript-eslint/explicit-function-return-type': 'off',
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: true, classes: true, variables: false }
    ], // disable the rule for variables, but enable it for functions and classes
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true
        },
        singleline: {
          delimiter: 'comma',
          requireLast: false
        }
      }
    ]
  },
  settings: {
    react: {
      version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  }
}
