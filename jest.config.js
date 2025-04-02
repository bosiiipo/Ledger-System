/** @type {import('jest').Config} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "js"],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
    },
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
    },
    extensionsToTreatAsEsm: [".ts"],
    globals: {
      "ts-jest": {
        useESM: true,
      },
    },
  };
  