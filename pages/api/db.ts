import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://admin:${process.env.DB_KEY}@whalewallet.tj5l6ae.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
client.connect();
