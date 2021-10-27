import {DynamoDBClient} from '@aws-sdk/client-dynamodb';

export const dynamodb = new DynamoDBClient({region: process.env.AWS_REGION || ''});
