import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const uri = `mongodb+srv://admin:${process.env.DB_KEY}@whalewallet.tj5l6ae.mongodb.net/?retryWrites=true&w=majority`;
const dbClient = new MongoClient(uri);
const dbName = 'whalewallet';

async function getContacts(user: string) {
  await dbClient.connect();

  const db = dbClient.db(dbName);
  const collection = db.collection('contacts');

  const contacts = await collection.findOne({ user: user }).then((result) => {
    return result?.contacts as string[];
  });
  return contacts;
}

async function createUser(user: string) {
  await dbClient.connect();

  const db = dbClient.db(dbName);
  const collection = db.collection('contacts');

  await collection.insertOne({ user: user, contacts: [] });
}

async function addContact(user: string, contact: string) {
  await dbClient.connect();

  const db = dbClient.db(dbName);
  const collection = db.collection('contacts');

  let contacts = await collection.findOne({ user: user }).then((result) => {
    return result?.contacts as string[];
  });

  if (contacts === undefined) {
    await createUser(user);
    contacts = [];
  } else if (contacts.includes(contact)) {
    return;
  }

  contacts.push(contact);

  await collection.insertOne({ user: user, contacts: contacts });
}

async function removeContact(user: string, contact: string) {
  await dbClient.connect();

  const db = dbClient.db(dbName);
  const collection = db.collection('contacts');

  let contacts = await collection.findOne({ user: user }).then((result) => {
    return result?.contacts as string[];
  });

  if (contacts === undefined || !contacts.includes(contact)) {
    return;
  }

  await collection.deleteOne({ user: user, contacts: contact });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const contacts = await getContacts(req.body.user);
    res.status(200).json({ contacts: contacts });
  } else if (req.method === 'POST') {
    await addContact(req.body.user, req.body.contact);
    res.status(200).json({ success: true });
  } else if (req.method === 'DELETE') {
    await removeContact(req.body.user, req.body.contact);
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ error: 'Invalid request method' });
  }
}
