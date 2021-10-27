import {Context} from 'aws-lambda/handler';
import {APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2} from 'aws-lambda/trigger/api-gateway-proxy';
import {setupLogger, logger} from '../common/logger/logger';
import {EventBody} from './types';
import {addItem} from './addItem';

const dynamoTable = process.env.TABLE_NAME || '';

export const handler = async (event: APIGatewayProxyEventV2, context?: Context): Promise<APIGatewayProxyStructuredResultV2> => {
    setupLogger(context);
    logger.debug('Event', {event});

    const {headers, body} = event;

    if (!body) {
        return {
            statusCode: 400,
            ...headers,
            body: JSON.stringify({
                message: 'Invalid body in request!'
            })
        };
    }

    const item: EventBody = JSON.parse(body);

    try {
        const response = await addItem(item, dynamoTable);
        logger.info('dynamo response', {response});

        return {
            statusCode: 200,
            ...headers,
            body: JSON.stringify({
                message: `Item id=${item.id} successfully saved!`
            })
        };
    } catch (error) {
        logger.error(`Unable to save item ${item.id}`, {error});

        return {
            statusCode: 500,
            ...headers,
            body: JSON.stringify({
                message: `Item id=${item.id} unable to save!`
            })
        };
    }
};
