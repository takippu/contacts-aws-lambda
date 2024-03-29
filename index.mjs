import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "contacts-information";

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    switch (event.routeKey) {
      //delete
      case "DELETE /contacts/{id}":
        await dynamo.send(
          new DeleteCommand({
            TableName: tableName,
            Key: {
              id: event.pathParameters.id,
            },
          })
        );
        body = `Deleted item ${event.pathParameters.id}`;
        break;
        //get specifics
      case "GET /contacts/{id}":
        body = await dynamo.send(
          new GetCommand({
            TableName: tableName,
            Key: {
              id: event.pathParameters.id,
            },
          })
        );
        body = body.Item;
        break;
        //get all
      case "GET /contacts":
        body = await dynamo.send(
          new ScanCommand({ TableName: tableName })
        );
        body = body.Items;
        break;
  
        //create new or update
      case "PUT /contacts":
        let requestJSON = JSON.parse(event.body);
        await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: {
              id: requestJSON.id,
              name: requestJSON.name,
              gender: requestJSON.gender,
              phoneNum: requestJSON.phoneNum,
              email: requestJSON.email,

            },
          })
        );
        body = `Put item ${requestJSON.id}`;
        break;
        case "GET /contacts/search":
          const nameToSearch = event.queryStringParameters.name;
          const sort = event.queryStringParameters.sort;
          const latest = parseInt(event.queryStringParameters.latest);
          const email = event.queryStringParameters.email;
          const gender = event.queryStringParameters.gender;


          if (nameToSearch) {
            const searchResponse = await dynamo.send(
              new ScanCommand({
                TableName: tableName,
                FilterExpression: 'contains (#n, :name)',
                ExpressionAttributeNames: { '#n': 'name' },
                ExpressionAttributeValues: { ':name': nameToSearch }
              })
            );

            if (!searchResponse.Items || searchResponse.Items.length === 0) {
              throw new Error(`There is no one with the name: ${nameToSearch}`);
            }

            body = searchResponse.Items;
          }else if (email) {
            const searchResponse = await dynamo.send(
              new ScanCommand({
                TableName: tableName,
                FilterExpression: 'contains (#n, :email)',
                ExpressionAttributeNames: { '#n': 'email' },
                ExpressionAttributeValues: { ':email': email }
              })
            );

            if (!searchResponse.Items || searchResponse.Items.length === 0) {
              throw new Error(`There is no one with the email: ${email}`);
            }

            body = searchResponse.Items;
          }else if (gender) {
            const searchResponse = await dynamo.send(
              new ScanCommand({
                TableName: tableName,
                FilterExpression: 'contains (#n, :gender)',
                ExpressionAttributeNames: { '#n': 'gender' },
                ExpressionAttributeValues: { ':gender': gender }
              })
            );

            if (!searchResponse.Items || searchResponse.Items.length === 0) {
              throw new Error(`There is no one with the gender: ${gender}`);
            }

            body = searchResponse.Items;
          } else if (sort) {
            const scanResponse = await dynamo.send(
              new ScanCommand({
                TableName: tableName
              })
            );
        
            if (!scanResponse.Items || scanResponse.Items.length === 0) {
              throw new Error("No items found");
            }
        
            // Sorting based on the 'name' property
            const sortedItems = scanResponse.Items.sort((a, b) => {
              if (sort.toUpperCase() === 'DESC') {
                return b.name.localeCompare(a.name); // Sort in descending order
              } else if(sort.toUpperCase() === 'ASC'){
                return a.name.localeCompare(b.name); // Sort in ascending order
              } else{
                throw new Error(`There is no such thing as ${sort}. Only ASC and DESC`);
              }
            });
        
            body = sortedItems;
          }else if (latest) {

            const scanResponse = await dynamo.send(
              new ScanCommand({
                TableName: tableName
              })
            );
        
            if (!scanResponse.Items || scanResponse.Items.length === 0) {
              throw new Error("No items found");
            }
        
            // Sorting based on the 'id' property to get the latest items
            const sortedItems = scanResponse.Items.sort((a, b) => {
              return parseInt(b.id) - parseInt(a.id); // Sort in descending order based on 'id'
            });
        
            // Take only the specified number of latest items
            const latestItems = sortedItems.slice(0, latest);
        
            body = latestItems;
          } else {
            throw new Error("Any parameter with proper usage is required for search. (name/sort/latest)");
          }
          break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
