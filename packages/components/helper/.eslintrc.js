require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  extends: ["../../tools/lint"],
  parserOptions: { tsconfigRootDir: __dirname },
};
