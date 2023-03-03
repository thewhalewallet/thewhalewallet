import { NextApiRequest, NextApiResponse } from 'next';
import mongoose, { Schema, Model } from 'mongoose';

const uri = `mongodb+srv://admin:${process.env.DB_KEY}@whalewallet.tj5l6ae.mongodb.net/whalewallet?retryWrites=true&w=majority`;

interface Wallet {
    address: string;
    ens: string;
    lens: string;
    isFavorite: boolean;
}

interface Users {
    oauth: string;
    name: string;
    email: string;
    image: string;
    wallets: Wallet[];
}

const UsersSchema = new Schema<Users>({
    oauth: { type: String, required: true, unique: true },
    name: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    image: { type: String, required: false, default: '' },
    wallets: [
        {
            address: { type: String, required: true },
            ens: { type: String, required: false, default: '' },
            lens: { type: String, required: false, default: '' },
            isFavorite: { type: Boolean, required: false, default: false },
        },
    ],
});

function validateUser(user: Users) {
    if (user.oauth !== undefined && user.oauth !== '') {
        throw Error('Invalid user object');
    }
}
function validateWallet(wallet: Wallet) {
    if (wallet.address !== undefined && wallet.address !== '') {
        throw Error('Invalid wallet object');
    }
}

async function initMongo(): Promise<Model<Users>> {
    const client = await mongoose.connect(uri).catch((err) => {
        throw Error('Failed to connect to database');
    });
    return client.model<Users>('user', UsersSchema);
}

async function doesNotExist(id: string): Promise<boolean> {
    if (id === undefined || id === '') {
        throw Error('Invalid user id');
    }
    const users = await initMongo();
    const exists = await users.exists({ oauth: id });
    return exists === null;
}

async function createBlankUser(id:string) {
    const users = await initMongo();
    await users.create({oauth: id}).catch((err) => {
        throw Error('Failed to create user');
    });
}
async function createUser(user: Users) {
    const users = await initMongo();
    await users.create(user).catch((err) => {
        throw Error('Failed to create user');
    });
}

async function getUser(id: string): Promise<any> {
    const users = await initMongo();
    if (await doesNotExist(id)) {
        throw Error('User does not exist');
    }
    else {
        return await users.find({ oauth: id }).catch((err) => {
            throw Error('Failed to find user');
        });
    }
}

async function addWalletToUser(id: string, wallet: Wallet) {
    const users = await initMongo();
    await users
        .updateOne({ oauth: id }, { $push: { wallets: wallet } })
        .catch((err) => {
            throw Error('Failed to add wallet');
        });
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const id = req.body.id as string;
    const user = req.body.user as Users;
    const wallet = req.body.wallet as Wallet;

    try {
        switch (req.method) {
            case 'GET':
                const data: Users = await getUser(id);
                res.status(200).json(data);
                break;

            case 'POST':
                if (await doesNotExist(id)) {
                    if (user) {
                        validateUser(user);
                        await createUser(user);
                    }
                    else {
                        await createBlankUser(id);
                    }
                }
                if (wallet) {
                    validateWallet(wallet);
                    await addWalletToUser(id, wallet);
                    res.status(200).json({ message: 'Wallet added' });
                } 

                break;

            default:
                res.status(405).json({ error: 'Method not allowed' });
                break;
        }
    }
    catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
}
