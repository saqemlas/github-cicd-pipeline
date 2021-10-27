import {createDynamoItem, addItem} from '../../../src/add/addItem';
import {createMockEvent, mockPutItemCommandOutput} from '../../data/mockItems';
import {dynamodb} from '../../../src/common/aws/dynamodb';
import {mocked} from 'ts-jest/utils';

jest.mock('../../../src/common/aws/dynamodb');

const mockDynamoDbClient = mocked(dynamodb, true);

describe('AddItem', () => {
    const mockEvent = createMockEvent('UNIT_TEST');

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    describe('createDynamoItem', () => {
        it('happy path', () => {
            const dynamoItem = createDynamoItem(mockEvent);

            expect(dynamoItem).toEqual({
                data: { S: mockEvent.data },
                name: { S: mockEvent.name },
                pk: { S: mockEvent.type },
                sk: { S: mockEvent.id },
                title: { S: mockEvent.title },
            });
        });
    });

    describe('addItem', () => {
        it('happy path', async () => {
            mockDynamoDbClient.send.mockImplementationOnce(() => mockPutItemCommandOutput)

            await addItem(mockEvent, 'mockTableName');

            expect(mockDynamoDbClient.send).toBeCalled();
            expect(mockDynamoDbClient.send).toBeCalledWith(expect.objectContaining({
                input: {
                    TableName: 'mockTableName',
                    Item: {
                        data: {
                            S: mockEvent.data
                        }, 
                        name: {
                            S: mockEvent.name
                        }, 
                        pk: {
                            S: mockEvent.type
                        }, 
                        sk: {
                            S: mockEvent.id
                        }, 
                        title: {
                            S: mockEvent.title
                        }
                    }
                },
            }));
        });
    });
});
