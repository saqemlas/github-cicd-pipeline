import {addItem} from '../../src/add/addItem';
import {createMockEvent} from '../data/mockItems';
import {deleteItem} from '../utils/deleteItem';
import {ResponseV3} from '../data/mockItems';

const tableName: string = process.env.TABLE_NAME || '';

describe('Integration test', () => {
    const mockEvent = createMockEvent('INTEGRATION_TEST');

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    afterAll(async () => {
        const response = await deleteItem(mockEvent.type, mockEvent.id, tableName) as ResponseV3;

        expect(response.$metadata.httpStatusCode).toEqual(200);
    });

    it('addItem - saving to dynamodb', async () => {
        const response = await addItem(mockEvent, tableName);

        expect(response.$metadata.httpStatusCode).toEqual(200)
    });
});
