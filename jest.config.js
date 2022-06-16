const config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '^@src/(.*)$': ['<rootDir>/$1'],
    '^@common/(.*)$': ['<rootDir>/common/$1'],
    '^@common': ['<rootDir>/common'],
    '^@resource/(.*)$': ['<rootDir>/resource/$1'],
    '^@resource': ['<rootDir>/resource'],
  },
  collectCoverageFrom: [
    '<rootDir>/resource/**/*.module.ts',
    '<rootDir>/resource/**/*.resolver.ts',
    '<rootDir>/resource/**/*.service.ts',
    '<rootDir>/utils/**/*.ts',
    '!<rootDir>/common/**/*.ts', // Might include this in the future
  ],
  coverageThreshold: {
    global: {
      // statements: 80,
      // branches: 80,
      // functions: 80,
      // lines: 80,
    },
  },
  testEnvironment: 'node',
  verbose: true,
};

module.exports = config;
