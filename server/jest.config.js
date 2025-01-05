export default {
    testEnvironment: 'node',
    transform: {},
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    testMatch: ['**/tests/**/*.test.js'],
    transformIgnorePatterns: [
      'node_modules/(?!(supertest)/)',
    ],
    verbose: true,
    setupFilesAfterEnv: ['./tests/setup.js'],
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
  };