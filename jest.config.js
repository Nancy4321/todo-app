// jest.config.js
export default {
    preset: 'ts-jest', // Use ts-jest for TypeScript support
    testEnvironment: 'node', // Test environment (Node.js)
    testMatch: ['**/tests/**/*.test.ts'], // Match test files
    moduleFileExtensions: ['ts', 'js', 'json'], // File extensions to look for
    transform: {
      '^.+\\.ts$': 'ts-jest', // Transform TypeScript files with ts-jest
    },
    collectCoverage: true, // Enable coverage reporting
    coverageDirectory: 'coverage', // Directory for coverage reports
    coverageReporters: ['text', 'lcov'], // Coverage report formats
  };