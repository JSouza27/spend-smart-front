// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './'
})

const customJestConfig = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/.next', '@types'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts(x)?', '!src/**/stories.tsx', '!src/pages/**/*.tsx', '!src/styles/**/*.ts',],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  modulePaths: ['<rootDir>/src/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  },
  transformIgnorePatterns: ['/node_modules/'],
  modulePathIgnorePatterns: ['stories\\.tsx$', 'styles\\.ts$', 'd\\.ts$'],
  moduleNameMapper: {
    "uuid": require.resolve('uuid'),
  }
}

module.exports = createJestConfig(customJestConfig)
