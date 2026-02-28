const { MongoClient } = require('mongodb');

import { MONGO_URI } from "../../secrets.js";
const client = new MongoClient(MONGO_URI);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Only GET requests allowed' }),
    };
  }

  try {
   
    await client.connect();
    const db = client.db('GameChunks');
    const logins = db.collection('Logins');
    
    const history = await logins
      .find({})
      .sort({ date: -1 }) // latest first
      .limit(100) // limit results (optional)
      .toArray();

    return {
        statusCode: 200,
        body: JSON.stringify({ logins: history })
      };
   
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error', error: error.message }),
    };
  } finally {
    if (client) {
      await client.close();
    }
  }
};
