import {createMockEvent} from '../data/mockItems';
import axios, {AxiosResponse} from 'axios';
import {deleteItem} from '../utils/deleteItem';
import {ResponseV3} from '../data/mockItems';

const tableName: string = process.env.TABLE_NAME || '';
const apiEndpoint: string = process.env.API_ENDPOINT || '';

describe('System (end-to-end) test', () => {
    const mockEvent = createMockEvent('SYSTEM_TEST');
    
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    afterAll(async () => {
        const response = await deleteItem(mockEvent.type, mockEvent.id, tableName) as ResponseV3;

        expect(response.$metadata.httpStatusCode).toEqual(200);
    });

    it('happy path - http post request (/add)', async () => {
        const headers = {
            'Content-Type': 'application/json'
        };
        const response: AxiosResponse = await axios.post(`${apiEndpoint}/add`, mockEvent, {headers});

        expect(response.status).toEqual(200);
        expect(response.data).toEqual({'message': `Item id=${mockEvent.id} successfully saved!`});
    });

    it('happy path - http get request (\'*\')', async () => {
        const headers = {
            'Content-Type': 'application/json'
        };
        
        try {
            await axios.get(`${apiEndpoint}`, {headers});
        } catch (error) {
            expect(error).toEqual(Error('Request failed with status code 400'));
        }
    });
});
