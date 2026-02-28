const { MongoClient } = require("mongodb");

import { MONGO_URI } from "../../secrets.js";
const client = new MongoClient(MONGO_URI);
const database = client.db('GameChunks');
const usersCollection = database.collection('users');

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
        const { user_id, password, username} = event.queryStringParameters;

        // Ensure all required parameters are present
        if (!user_id || !password) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Missing required parameters" }),
            };
        }
	
        // Connect to MongoDB
        await client.connect();
        const normalizedUsername = username.toLowerCase();
		const username_exists =  await usersCollection.findOne({
            username: { $regex: `^${normalizedUsername}$`, $options: 'i' }
		if(username_exists)
			return {
				statusCode: 200,
				body: "USERNAME_EXISTS"
			};
		//tasks: tasks completed
        // Create user object
 const user = {
                user_id,
		password: password,
                coins: 50,
		FCM_Token: "Token",
		tasks: 0,
		username: username,
		coinsEarned: 0,
		registration_date: new Date(),
		redeem_history:  [],
                rewards: [
                    {
                        reward_type: "Joining Bonus",
                        reward_amount: 50,
                        date: new Date()
                    }
                ]
            };


        await usersCollection.insertOne(user);

        return {
            statusCode: 200,
            body: "REGISTERED_SUCCESSFULLY",
        };

    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: "SERVER_ERROR",
        };
    } finally {
        await client.close();
    }
};
