// eslint-disable-next-line import/no-nodejs-modules
const path = require("path");

const quick = process.argv.includes("--bail");

const baseConfig = {
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.ts?(x)",
    "!**/*WebPart.ts",
    "!**/*.stories.ts?(x)",
    "!**/*.module.scss",
    "!**/*.module.scss.ts",
  ],
  coverageDirectory: "<rootDir>/../temp/test",
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageReporters: [
    "cobertura",
    "json",
    "lcov",
    ["html-spa", { subdir: "report" }],
    "text-summary",
  ],
  globalSetup: path.resolve(__dirname, "global-setup.js"),
  jestJsonReporter: {
    outputFile: "tests-test-results.json",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  moduleNameMapper: {
    "@fluentui/react/lib/(.*)$": "@fluentui/react/lib-commonjs/$1",
    "@microsoft/sp-core-library": "identity-obj-proxy",
    "@microsoft/sp-page-context": "identity-obj-proxy",
    "@microsoft/sp-property-pane": "@microsoft/sp-property-pane/lib/index.js",
    "@uifabric/react-hooks/lib/(.*)$": "@uifabric/react-hooks/lib-commonjs/$1",
    "Bpa(.*)WebPartStrings": "<rootDir>/webparts/bpa$1/loc/tests.js",
  },
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "<rootDir>/../temp/test",
        outputName: "junit.xml",
        suiteName: "jest tests",
      },
    ],
    "jest-image-snapshot/src/outdated-snapshot-reporter.js",
  ],
  setupFilesAfterEnv: [
    "raf/polyfill",
    path.resolve(__dirname, "jest.setup.js"),
  ],
  snapshotSerializers: ["@uifabric/jest-serializer-merge-styles"],
  testEnvironment: "jest-environment-jsdom",
  testMatch: [
    "**/src/**/*.(test|spec).+(ts|js)?(x)",
    "**/__tests__/**/*.(test|spec).+(ts|js)?(x)",
  ],
  testResultsProcessor: "jest-json-reporter",
  testURL: "http://localhost",
  transformIgnorePatterns: ["node_modules/(?!(@microsoft/*|@pnp/*))"],
};

if (quick) {
  baseConfig.coverage = false;
  baseConfig.collectCoverage = false;
}

module.exports = baseConfig;
