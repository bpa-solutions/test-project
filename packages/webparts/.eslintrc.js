require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  extends: ["../tools/lint"],
  overrides: [
    {
      files: ["gulpfile.js"],
      rules: {
        "import/no-nodejs-modules": "off",
        "no-console": "off",
      },
    },
    {
      files: ["src/build.ts", "src/index.tsx"],
      rules: {
        "import/unambiguous": "off",
        "spaced-comment": "off",
      },
    },
  ],
  parserOptions: { tsconfigRootDir: __dirname },
  rules: {
    "import/no-default-export": "off",
    "jsdoc/require-jsdoc": "off",
    "react/require-optimization": "off",
  },
};
