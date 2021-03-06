module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "@vue/typescript/recommended",
    '@vue/typescript'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  rules: {
    // "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    'no-unused-vars': 'off',
    'no-var-requires': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-var-requires': 'off'
    // 'space-before-function-paren': [2, 'never'],
    // 'vue/array-bracket-spacing': 'error',
    // 'vue/arrow-spacing': 'error',
    // 'vue/block-spacing': 'error',
    // 'vue/brace-style': 'error',
    // 'vue/camelcase': 'error',
    // 'vue/comma-dangle': 'error',
    // 'vue/component-name-in-template-casing': 'error',
    // 'vue/eqeqeq': 'error',
    // 'vue/key-spacing': 'error',
    // 'vue/match-component-file-name': 'error',
    // 'vue/object-curly-spacing': 'error'
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        mocha: true
      }
    }
  ]
};
