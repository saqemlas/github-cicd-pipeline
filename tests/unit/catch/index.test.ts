import {handler} from '../../../src/catch/index';
import * as eventWithBody from '../../data/with_body.json';

describe('Catch Function (Api path = "*")', () => {
    it('happy path', async () => {
        const response = await handler(eventWithBody);

        expect(response.statusCode).toEqual(400);
        expect(response.body).toEqual('{\"message\":\"Invalid path, method, or headers!\"}');
    });
});
