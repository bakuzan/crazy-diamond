module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['__tests__/utils/'],

  collectCoverageFrom: ['src/utils/*.ts'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleDirectories: ['.', 'src', 'node_modules'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};
