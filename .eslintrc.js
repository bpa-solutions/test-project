require("@rushstack/eslint-patch/modern-module-resolution");

// TEMPORARY FILE

module.exports = {
  extends: ["./packages/tools/lint"],
  parserOptions: { tsconfigRootDir: __dirname },
};
