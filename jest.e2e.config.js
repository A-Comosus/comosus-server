module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testEnvironment: 'node',
  testRegex: '.*\\.e2e-spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '^@src/(.*)$': ['<rootDir>/$1'],
    '^@common': ['<rootDir>/common'],
    '^@common/(.*)$': ['<rootDir>/common/$1'],
    '^@resource': ['<rootDir>/resource'],
    '^@resource/(.*)$': ['<rootDir>/resource/$1'],
  },
  collectCoverageFrom: ['<rootDir>/**/*.ts'],
  testEnvironment: 'node',
  verbose: true,
};
