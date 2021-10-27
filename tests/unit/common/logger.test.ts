import {logger, setupLogger} from '../../../src/common/logger/logger';
import {Context} from 'aws-lambda';
import {mocked} from 'ts-jest/utils';

jest.mock('../../../src/common/logger/logger');

const mockedSetupLoggerMetadata = mocked(setupLogger, true);
const mockedLogger = mocked(logger, true);

const mockContext: Context = {
    callbackWaitsForEmptyEventLoop: false,
    functionName: 'mock-function',
    functionVersion: '1',
    invokedFunctionArn: 'mock-arn',
    memoryLimitInMB: 'mock-memory',
    awsRequestId: 'aws-request-id',
    logGroupName: 'mock-log-group-name',
    logStreamName: 'mock-log-stream-name',
    getRemainingTimeInMillis: (): number => 1,
    done: jest.fn(),
    fail: jest.fn(),
    succeed: jest.fn(),
};

const mockData = {hello: 'world'};

describe('Logging Service', () => {
    it('should set up log context', () => {
        setupLogger(mockContext, {utilLogsLevel: 'info'});
  
        expect(mockedSetupLoggerMetadata).toBeCalledWith(mockContext, {utilLogsLevel: 'info'});
    });

    it('should log message to info', () => {
        logger.info('info log', mockData);
  
        expect(mockedLogger.info).toBeCalledWith('info log', mockData);
    });

    it('should log message to debug', () => {
        logger.debug('debug log', mockData);
  
        expect(mockedLogger.debug).toBeCalledWith('debug log', mockData);
    });

    it('should log message to warn', () => {
        logger.warn('warn log', mockData);
  
        expect(mockedLogger.warn).toBeCalledWith('warn log', mockData);
    });

    it('should log message to error', () => {
        logger.error('error log', mockData);
  
        expect(mockedLogger.error).toBeCalledWith('error log', mockData);
    });
});
