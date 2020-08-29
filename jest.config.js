module.exports = {
  roots: ['<rootDir>/src'],
  testEnvironmet: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  globals: {
    'ts-jest': {
      isolatedModules: false,
    },
  }
}