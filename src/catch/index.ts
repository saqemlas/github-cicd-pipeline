import {Context} from 'aws-lambda/handler';
import {APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2} from 'aws-lambda/trigger/api-gateway-proxy';
import {setupLogger, logger} from '../common/logger/logger';

export const handler = async (event: APIGatewayProxyEventV2, context?: Context): Promise<APIGatewayProxyStructuredResultV2> => {
    setupLogger(context);
    logger.debug('Event', {event});

    return {
        statusCode: 400,
        ...event.headers,
        body: JSON.stringify({
            message: 'Invalid path, method, or headers!'
        })
    };
};
