import { MongoClient, ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

async function setToken(userId: string, token: string, itemId: string) {
  const uri = `mongodb+srv://admin:${process.env.DB_KEY}@whalewallet.tj5l6ae.mongodb.net/?retryWrites=true&w=majority`;
  const dbClient = new MongoClient(uri);
  const dbName = 'whalewallet';
  await dbClient.connect();

  const db = dbClient.db(dbName);
  const collection = db.collection('users');

  await collection.updateOne(
    { "_id": new ObjectId(userId)}, // filter
    { $set: { plaid_access_token: token, plaid_item_id: itemId } }, // update
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

interface SetTokenProps extends NextApiRequest {
  body: {
    public_token: string;
    user_id: string;
  };
}

export default async function handler(req: SetTokenProps, res: NextApiResponse) {
  const configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
        'PLAID-SECRET': process.env.PLAID_SECRET,
      },
    },
  });

  const client = new PlaidApi(configuration);
  const user_id = req.body.user_id;

  await client
    .itemPublicTokenExchange({
      public_token: req.body.public_token,
    })
    .then(async (response) => {
      await setToken(user_id, response.data.access_token, response.data.item_id).catch((error) => {
        console.log(`setToken() failed: ${error}`);
        res.status(500).json({ error: error });
      });

      await client
        .accountsBalanceGet({
          access_token: response.data.access_token,
        })
        .then((response) => {
          setAccountData(user_id, response.data.accounts).catch((error) => {
            console.log(`setAccountData() failed: ${error}`);
            res.status(500).json({ error: error });
          });
        })
        .catch((error) => {
          console.log(`transactionsSync() failed: ${error}`);
          res.status(500).json({ error: error });
        });
    })
    .catch((error) => {
      console.log(`exchange public token failed: ${error}`);
      console.log(`public_token: ${req.body.public_token}`);
      res.status(500).json({ error: error });
    })
    .finally(() => {
      res.status(200).json({ success: true });
    });
}
