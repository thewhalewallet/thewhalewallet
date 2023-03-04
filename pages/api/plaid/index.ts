import { MongoClient, ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import IPlaidTx from '@/components/types/IPlaidTx';

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const uri = `mongodb+srv://admin:${process.env.DB_KEY}@whalewallet.tj5l6ae.mongodb.net/?retryWrites=true&w=majority`;
const dbClient = new MongoClient(uri);
const dbName = 'whalewallet';

async function getAccessToken(item_id: string) {
  await dbClient.connect();

  const db = dbClient.db(dbName);
  const collection = db.collection('users');

  const access_token = await collection.findOne({ plaid_item_id: item_id }).then((result) => {
    return result?.plaid_access_token as string;
  });

  return access_token;
}

async function setUserTx(access_token: string, tx: IPlaidTx[]) {
    await dbClient.connect();
  
    const db = dbClient.db(dbName);
    const collection = db.collection('users');

    await collection.updateOne(
        { "plaid_access_token": access_token }, // filter
        { $set: { plaid_tx: tx } }, // update
        { upsert: true } // options
        );
}

async function setAccountData(userId: string, accountData: any[]) {
    const uri = `mongodb+srv://admin:${process.env.DB_KEY}@whalewallet.tj5l6ae.mongodb.net/?retryWrites=true&w=majority`;
    const dbClient = new MongoClient(uri);
    const dbName = 'whalewallet';
    await dbClient.connect();
  
    const db = dbClient.db(dbName);
    const collection = db.collection('users');
  
    await collection.updateOne(
      { "_id": new ObjectId(userId)}, // filter
      { $set: { plaid_account_data: accountData } }, // update
      { upsert: true } // options
    );
  }

interface PlaidHook extends NextApiRequest {
  body: {
    webhook_code: string;
    webhook_type: string;
    item_id: string;
    new_transactions: number;
  };
}


export default async function handler(req: PlaidHook, res: NextApiResponse) {
  if (req.body.webhook_code === 'HISTORICAL_UPDATE') {
    const access_token = await getAccessToken(req.body.item_id);
    const client = new PlaidApi(configuration);

    await client
      .transactionsSync({
        access_token: access_token,
      })
      .then((response) => {
        
      });

    res.status(200);
  }
 else {
    res.status(200);
  }
}