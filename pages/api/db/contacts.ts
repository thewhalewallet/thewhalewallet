import { NextApiRequest, NextApiResponse } from 'next';
import mongoose, { Schema, Model } from 'mongoose';

const uri = `mongodb+srv://admin:${process.env.DB_KEY}@whalewallet.tj5l6ae.mongodb.net/whalewallet?retryWrites=true&w=majority`;

interface Contact {
  name: String;
  address: String;
  ens: String;
  lens: String;
  isFavorite: Boolean;
}

interface Contacts {
  user: String;
  contacts: Contact[];
}

const ContactListSchema = new Schema<Contacts>({
  user: { type: String, required: true, unique: true },
  contacts: [
    {
      name: { type: String, required: true },
      address: { type: String, required: true },
      ens: { type: String, required: false },
      lens: { type: String, required: false },
      isFavorite: { type: Boolean, required: false, default: false },
    },
  ],
});

async function initMongo(): Promise<Model<Contacts>> {
  const client = await mongoose.connect(uri).catch((err) => {
    throw Error('Failed to connect to database');
  });
  return client.model<Contacts>('contact', ContactListSchema);
}

async function doesNotExist(user: string): Promise<boolean> {
  const contacts = await initMongo();
  const exists = await contacts.exists({ user: user });
  return exists === null;
}

async function createUser(user: string): Promise<void> {
  const contacts = await initMongo();
  await contacts.create({ user: user, contacts: [] }).catch((err) => {
    throw Error('Failed to create user');
  });
}

async function getUser(user: string): Promise<any> {
  const contacts = await initMongo();
  if (user === undefined || user === '') {
    return await contacts.find().catch((err) => {
      throw Error('Failed to find all users');
    });
  }
 else if (await doesNotExist(user)) {
    throw Error('User does not exist');
  }
 else {
    return await contacts.find({ user: user }).catch((err) => {
      throw Error('Failed to find user');
    });
  }
}

async function addContact(user: string, contact: Contact) {
  const contacts = await initMongo();
  await contacts
    .updateOne({ user: user }, { $push: { contacts: contact } })
    .catch((err) => {
      throw Error('Failed to add contact');
    });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const user = req.body.user as string;
  const contact = req.body.contact as Contact;

  try {
    switch (req.method) {
      case 'GET':
        const data: Contact = await getUser(user);
        res.status(200).json(data);
        break;

      case 'POST':
        if (await doesNotExist(user)) {
          await createUser(user);
        }
        await addContact(user, contact);
        res.status(200).json({ message: 'Contact added' });
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
