# Lead Management System - Unit Testing Documentation

## Overview

This repository contains unit tests for the Lead Management System API. The tests are written using Jest and Supertest for testing HTTP endpoints.

### Technology Stack
- Jest (Testing Framework)
- Supertest (HTTP Testing)
- Jest Mock (Mocking)
- Jest Coverage (Code Coverage)

## Testing Setup

### Installation
```bash
# Install dependencies
npm install --save-dev jest supertest @babel/preset-env

# Install types for better IDE support
npm install --save-dev @types/jest

# Install Jest Mock
npm install --save-dev jest-mock
```

### Configuration
Create a `jest.config.js` file in the root directory with the following content:

```javascript
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
```

## Test Structure
The tests are organized into separate files for each endpoint. Each file contains a set of tests for a specific endpoint, including:
- Test setup: Clearing and resetting mocks before each test.
- Test cases: Each test case should test a specific scenario or functionality.
- Assertions: Verify the expected behavior of the endpoint.

## Running Tests
To run the tests, use the following command:

```bash
npm test
```



