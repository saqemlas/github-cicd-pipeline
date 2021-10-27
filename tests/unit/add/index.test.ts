import {handler} from '../../../src/add/index';
import {addItem} from '../../../src/add/addItem';
import * as eventWithoutBody from '../../data/without_body.json';
import * as eventWithBody from '../../data/with_body.json';
import {mocked} from 'ts-jest/utils';
import {mockPutItemCommandOutput} from '../../data/mockItems';

jest.mock('../../../src/add/addItem');

const mockedAddItem = mocked(addItem, true);

describe('Add Function (Api path = /add)', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    it('event without body', async () => {
        const response = await handler(eventWithoutBody);

        expect(response.statusCode).toEqual(400);
        expect(response.body).toEqual('{\"message\":\"Invalid body in request!\"}');
    });

    it('unable to add item', async () => {
        mockedAddItem.mockRejectedValueOnce({});

        const response = await handler(eventWithBody);

        expect(response.statusCode).toEqual(500);
        expect(response.body).toEqual('{\"message\":\"Item id=2afb9edf-0d86-4069-8bbb-6a4b66bd91c8 unable to save!\"}');
    });

    it('happy path - item added', async () => {
        mockedAddItem.mockResolvedValueOnce(mockPutItemCommandOutput);

        const response = await handler(eventWithBody);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual('{\"message\":\"Item id=2afb9edf-0d86-4069-8bbb-6a4b66bd91c8 successfully saved!\"}');
    });
});
