require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: ['../../tools/lint'],
  parserOptions: { tsconfigRootDir: __dirname },
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    'jsdoc/require-file-overview': 'off'
  }
};
