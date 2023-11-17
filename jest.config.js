module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    testMatch: [
      "**/tests/**/*.js",
      "**/tests/**/*.jsx",
      "**/tests/**/*.ts",
      "**/tests/**/*.tsx"
    ],
    
  };