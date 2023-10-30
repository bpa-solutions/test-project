require("@testing-library/jest-dom");
const { toHaveNoViolations } = require("jest-axe");
const { toMatchImageSnapshot } = require("jest-image-snapshot");
global.performance = require("perf_hooks").performance;

global.performance.mark = () => {};
global.performance.measure = () => {};

expect.extend(toHaveNoViolations);
expect.extend({ toMatchImageSnapshot });

// Remove console.error when executing Jest
console.error = () => {};

// Mocking up the dataVersion property of the object sp-http to a static version
// If we do not do that, we will have errors on compile time, similar to:
// SyntaxError: Unexpected token export
// See: https://github.com/Voitanos/jest-preset-spfx-react16/issues/1#issuecomment-451249295
jest.mock("@microsoft/sp-http/", () => ({ dataVersion: "1.0.0.0" }));

jest.mock("@pnp/logging");

jest.mock("@microsoft/sp-loader", () => ({
  SPComponentLoader: {
    loadComponentById: jest.fn().mockImplementation(() => {
      return Promise.resolve({ LivePersonaCard: undefined });
    }),
  },
}));
