import { NextApiRequest, NextApiResponse } from 'next';
import mongoose, { Schema, Model } from 'mongoose';

const uri = `mongodb+srv://admin:${process.env.DB_KEY}@whalewallet.tj5l6ae.mongodb.net/whalewallet?retryWrites=true&w=majority`;

interface Wallet {
  address: string;
  name: string;
  ens: string;
  lens: string;
  isFavorite: boolean;
}

interface Users {
  oauth: string;
  name: string;
  email: string;
  image: string;
  plaid_access_token: string;
  plaid_item_id: string;
  wallets: Wallet[];
}

const UsersSchema = new Schema<Users>({
  oauth: { type: String, required: true, unique: true },
  name: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  image: { type: String, required: false, default: '' },
  plaid_access_token: { type: String, required: false, default: '' },
  plaid_item_id: { type: String, required: false, default: '' },
  wallets: [
    {
      address: { type: String, required: true },
      name: { type: String, required: false, default: ''},
      ens: { type: String, required: false, default: '' },
      lens: { type: String, required: false, default: '' },
      isFavorite: { type: Boolean, required: false, default: false },
    },
  ],
});

async function initMongo(): Promise<Model<Users>> {
  const client = await mongoose.connect(uri).catch((err) => {
    throw Error('Failed to connect to database');
  });
  return client.model<Users>('user', UsersSchema);
}
async function createUser(user: Users) {
  const users = await initMongo();
  await users
    .findOneAndUpdate({ oauth: user.oauth}, user, { upsert: true })
    .catch((err) => {
      throw Error('Failed to create user');
    });
}

async function getUser(id: string): Promise<any> {
  const users = await initMongo();
  return await users.find({ oauth: id }).catch((err) => {
    throw Error('Failed to find user');
  });
}

async function addWallet(user: Users, wallet: Wallet) {
  const users = await initMongo();
  await users
    .updateOne({ oauth: user.oauth}, { $push: { wallets: wallet } })
    .catch((err) => {
      throw Error('Failed to add wallet');
    });
}

async function removeWallet(user: Users, wallet: Wallet) {
  const users = await initMongo();
  // await users
  //   .updateOne({ oauth: user.oauth}, { $pull: { $in: {"address": wallet.address} } })
  //   .catch((err) => {
  //     throw Error('Failed to add wallet');
  //   });

    await users
    .updateOne({ oauth: user.oauth}, { $pull: { wallets: { address: wallet.address } }})
    .catch((err) => {
      throw Error('Failed to delete wallet');
    });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  try {
    switch (req.method) {
      case 'GET':
        {
          const id = req.query.id as string;
          const user = await getUser(id);
          res.status(200).json(user);
        }
        break;

      case 'POST':
        {
          const user = req.body.user as Users;
          const wallet = req.body.wallet as Wallet;

          await createUser(user);
          if (wallet) {
            await addWallet(user, wallet);
            res.status(200).json({ message: 'Added wallet to user' });
          }
          else {
            res.status(200).json({ message: 'Added user' });
          }
        }
        break;

      case 'DELETE':
        {
          const user = req.body.user as Users;
          const wallet = req.body.wallet as Wallet;
          await removeWallet(user, wallet);
          res.status(200).json({ message: 'Removed wallet from user' });
        }
        break;

      default:
        res.status(405).json({ error: 'Method not allowed' });
    }
  }
 catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
