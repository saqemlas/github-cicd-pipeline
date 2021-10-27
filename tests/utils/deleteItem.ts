import {DynamoDBClient, DeleteItemCommand, DeleteItemInput, DeleteItemOutput} from '@aws-sdk/client-dynamodb';

export const dynamodb = new DynamoDBClient({region: process.env.AWS_REGION || ''});

export const deleteItem = async (pk: string, sk: string, tableName: string): Promise<DeleteItemOutput> => {
    const input: DeleteItemInput = {
        TableName: tableName,
        Key: {
            pk: {
                S: pk
            },
            sk: {
                S: sk
            }
        }
    };
    return await dynamodb.send(new DeleteItemCommand(input));
};
