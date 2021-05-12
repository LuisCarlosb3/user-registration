module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  roots: [
    '<rootDir>/tests'
  ],
  testEnvironment: 'node',
  transform: { ".(js|jsx|tx|tsx)": "@sucrase/jest-plugin" },
  watchman: true
}
