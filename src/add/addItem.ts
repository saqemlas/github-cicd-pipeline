import {PutItemCommand, PutItemCommandInput, PutItemCommandOutput,  AttributeValue} from '@aws-sdk/client-dynamodb';
import {dynamodb} from '../common/aws/dynamodb';
import {EventBody} from './types';
import {logger} from '../common/logger/logger';

export const createDynamoItem = (item: EventBody): {[key: string]: AttributeValue} => {
    return {
        pk: {
            S: item.type
        },
        sk: {
            S: item.id
        },
        data: {
            S: item.data
        },
        title: {
            S: item.title
        },
        name: {
            S: item.name
        }
    };
};

export const addItem = async (item: EventBody, tableName: string): Promise<PutItemCommandOutput> => {
    const input: PutItemCommandInput = {
        TableName: tableName,
        Item: createDynamoItem(item)
    };
    
    try {
        return await dynamodb.send(new PutItemCommand(input));
    } catch (error) {
        logger.error(`Unable to send PutItem for Item ${item.id}`, {error});
        throw new Error(`Unable to send PutItem for Item ${item.id}`);
    }
};
