import {PutItemCommandOutput} from '@aws-sdk/client-dynamodb';
import {EventBody} from '../../src/add/types';

export const createMockEvent = (type: string): EventBody => {
    const now: Date = new Date();
    return {
        type: type,
        id: `id#${now.valueOf().toString()}`,
        data: `draft#${now.toISOString()}`,
        title: 'Tests are the best',
        name: 'Tester McTest'
    }
};

export const mockPutItemCommandOutput = {
    'response': {
        '$metadata': {
            'attempts': 1,
            'httpStatusCode': 200,
            'requestId': 'TI62RFRV1BEMEIB34A224N9N2FVV4KQNSO5AEMVJF66Q9ASUAAJG',
            'totalRetryDelay': 0
        }
    }
} as unknown as PutItemCommandOutput;

export interface ResponseV3 {
    '$metadata': {
        attempts: string;
        cfId?: string; 
        extendedRequestId?: string; 
        httpStatusCode: number; 
        requestId: string
        totalRetryDelay: number;
    }
}
