// /** @type {import('ts-jest').JestConfigWithTsJest} **/
// module.exports = {
//   testEnvironment: "node",
//   transform: {
//     "^.+.tsx?$": ["ts-jest",{}],
//   },
  
// };

// jest.config.ts
import { JestConfigWithTsJest, createDefaultPreset } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  ...createDefaultPreset(),
}