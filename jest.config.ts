// /** @type {import('ts-jest').JestConfigWithTsJest} **/
// module.exports = {
//   testEnvironment: "node",
//   transform: {
//     "^.+.tsx?$": ["ts-jest",{}],
//   },
  
// };

// jest.config.ts
// import { JestConfigWithTsJest, createDefaultPreset } from 'ts-jest'

// const jestConfig: JestConfigWithTsJest = {
  
//   ...createDefaultPreset(),
// }

import { Config } from "@jest/types";

const config: Config.InitialOptions = {
  automock: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  testEnvironment: "node",
  coverageProvider: "v8",
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
  maxConcurrency: 5,
  preset: "ts-jest",
  verbose: true,
  rootDir: ".",
  setupFilesAfterEnv: ['<rootDir>/singleton.ts'],
};

export default config;