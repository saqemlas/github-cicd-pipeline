import type {Config} from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
    return {
        verbose: true,
        clearMocks: true,
        resetMocks: true,
        maxWorkers: 1,
        preset: 'ts-jest',
        testEnvironment: 'node',
        moduleNameMapper: {
            '^lodash-es$': 'lodash',
        },
        moduleDirectories: [
            'node_modules',
        ],
        moduleFileExtensions: [
            'js',
            'ts',
            'json'
        ],
        modulePathIgnorePatterns: [
            '.serverless',
        ],
        collectCoverageFrom: [
            'src/**/*'
        ],
        coveragePathIgnorePatterns: [
            'node_modules',
            '.serverless',
        ],
        testMatch: [
            '**/tests/**/*.+(ts)',
            '**/?(*.)+(tests).+(ts)'
        ],
        testPathIgnorePatterns: [
            'node_modules',
            '.serverless',
            'tests/unit/setupEnv.ts',
            'tests/utils'
        ],
        transform: {
            '^.+\\.(ts)$': 'ts-jest',
        },
        globals: {
            'ts-jest': {
                diagnostics: true,
                tsconfig: 'tsconfig.json',
            },
        },
    };
};

