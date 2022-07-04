import type {Config} from '@jest/types'

const config: Config.InitialOptions = {
  coverageReporters: ['json', 'html', 'lcov', 'text'],
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'ts'],
  setupFiles: ['./tests/util.ts']
}

export default config
