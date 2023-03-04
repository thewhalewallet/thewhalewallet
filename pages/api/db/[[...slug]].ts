import { NextApiRequest, NextApiResponse } from 'next';
import mongoose, { Model } from 'mongoose';
import UserModel from './usersSchma';
import { ObjectId } from 'mongodb';
import IWallet from "../../../components/types/IWallet";
import IContact from "../../../components/types/IContact";
import IUser from "../../../components/types/IUser";
import IPlaidAccount from '@/components/types/IPlaidAccount';

const uri = `mongodb+srv://admin:${process.env.DB_KEY}@whalewallet.tj5l6ae.mongodb.net/whalewallet?retryWrites=true&w=majority`;

async function initMongo() {
  await mongoose.connect(uri).catch((err) => {
    throw Error('Failed to connect to database');
  });
}

// ------------------ USER METHODS ------------------
async function getUser(user_id: string): Promise<IUser> {
  return await UserModel.findOne({ _id: user_id }).catch((err) => {
    throw Error('Failed to find user');
  });
}
async function createUser(user: IUser): Promise<IUser> {
  return await UserModel.create(user).catch((err) => {
    throw Error('Failed to create user');
  });
}
async function updateUser(user: IUser) {
  if (await UserModel.exists({ email: user.email })) {
    throw Error('User already exists');
  }
  await UserModel.updateOne({ email: user.email }, user).catch((err) => {
    throw Error('Failed to update user');
  });
}
async function deleteUser(user_id: string) {
  return await UserModel.deleteOne({ _id: user_id }).catch((err) => {
    throw Error('Failed to delete user');
  });
}

// ------------------ WALLET METHODS ------------------
async function getWallet(wallet_id: string): Promise<IWallet> {
  return await UserModel.findById(wallet_id).then((res) => {
    return res.wallets[0];
  });
}
async function addWallet(user_id: string, wallet: IWallet) {
  return await UserModel.updateOne(
    { _id: user_id },
    { $push: { wallets: wallet } },
  ).catch((err) => {
    throw Error('Failed to add wallet');
  });
}
async function updateWallet(user_id: string, wallet: IWallet) {
  return await UserModel.updateOne(
    { _id: user_id, 'wallets.address': wallet.address },
    { $set: { 'wallets.$': wallet } },
  ).catch((err) => {
    throw Error('Failed to update wallet');
  });
}
async function removeWallet(user_id: string, wallet: IWallet) {
  return await UserModel.updateOne(
    { _id: user_id },
    {
      $pull: {
        wallets: {
          $or: [
            { address: wallet.address },
            { name: wallet.name },
            { ens: wallet.ens },
            { lens: wallet.lens },
          ],
        },
      },
    },
  ).catch((err) => {
    throw Error('Failed to remove wallet');
  });
}

// ------------------ CONTACTS METHODS ------------------
async function getContact(contact_id: string): Promise<IContact> {
  return await UserModel.findById(contact_id).then((res) => {
    return res.contacts[0];
  });
}
async function addContact(user_id: string, contact: IContact) {
  return await UserModel.updateOne(
    { _id: user_id },
    { $push: { contacts: contact } },
  ).catch((err) => {
    throw Error('Failed to add contact');
  });
}
async function updateContact(user_id: string, contact: IContact) {
  return await UserModel.updateOne(
    { _id: user_id, 'contacts.address': contact.address },
    { $set: { 'contacts.$': contact } },
  ).catch((err) => {
    throw Error('Failed to update contact');
  });
}
async function removeContact(user_id: string, contact: IContact) {
  return await UserModel.updateOne(
    { _id: user_id },
    {
      $pull: {
        contacts: {
          $or: [
            { address: contact.address },
            { name: contact.name },
            { ens: contact.ens },
            { lens: contact.lens },
          ],
        },
      },
    },
  ).catch((err) => {
    throw Error('Failed to remove contact');
  });
}

// ------------------ LOOKUP METHODS ------------------
async function getObjectIdOfUser(user: IUser): Promise<ObjectId> {
  return await UserModel.find({
    $or: [{ email: user.email }, { name: user.name }],
  })
    .then((res) => {
      return res[0]._id;
    })
    .catch((err) => {
      throw Error('Failed to find user');
    });
}
async function getObjectIdOfWallet(
  user: IUser,
  wallet: IWallet,
): Promise<ObjectId> {
  return await UserModel.find({
    $or: [{ email: user.email }, { name: user.name }],
  })
  .then((res) => {
    const id = res[0].wallets.find(
      (w: IWallet) =>
        w.address === wallet.address ||
        w.name === wallet.name ||
        w.ens === wallet.ens ||
        w.lens === wallet.lens,
    )._id;
    if (!id) {
      throw Error('Failed to find wallet');
    }
    return id;
  })
  .catch((err) => {
    throw Error('Failed to find user');
  });
}
async function getObjectIdOfContact(
  user: IUser,
  contact: IContact,
): Promise<ObjectId> {
  return await UserModel.find({
    $or: [{ email: user.email }, { name: user.name }],
  })
    .then((res) => {
      const id = res[0].contacts.find(
        (c: IContact) =>
          c.address === contact.address ||
          c.name === contact.name ||
          c.ens === contact.ens ||
          c.lens === contact.lens,
      )._id;
      if (!id) {
        throw Error('Failed to find contact');
      }
      return id;
    })
    .catch((err) => {
      throw Error('Failed to find user');
    });
}
async function getObjectIdOfAccount(user: IUser, account: IPlaidAccount): Promise<ObjectId> {

  return await UserModel.find({
    $or: [{ email: user.email }, { name: user.name }],
  })
  .then((res) => {
    const id = res[0].plaidAccounts.find(
      (a: IPlaidAccount) =>
        a.name.toLowerCase() === account.name.toLowerCase(),
    )._id;
    if (!id) {
      throw Error('Failed to find account');
    }
    return id;
  })
  .catch((err) => {
    throw Error('Failed to find user');
  });
}

// ------------------ PLAID METHODS ------------------
async function addPlaidAccount(user_id: string, account: IPlaidAccount) {
  return await UserModel.updateOne(
    { _id: user_id },
    { $push: { plaidAccounts: account } },
  ).catch((err) => {
    throw Error('Failed to add plaid account');
  }
  );
}

async function removePlaidAccount(user_id: string, account: IPlaidAccount) {
  return await UserModel.updateOne(
    { _id: user_id },
    {
      $pull: {
        plaidAccounts: {
          $or: [
            { _id: account._id }
          ],
        },
      },
    },
  ).catch((err) => {
    throw Error('Failed to remove plaid account');
  }
  );
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const slug = req.query.slug as string[];
  try {
    await initMongo();

    switch (slug[0]) {
      case 'users':
        switch (req.method) {
          case 'GET':
            res.status(200).json(await getUser(slug[1]));
            break;
          case 'POST':
            res.status(200).json(await createUser(req.body.user as IUser));
            break;
          case 'PUT':
            res.status(200).json(await updateUser(req.body.user as IUser));
            break;
          case 'DELETE':
            res.status(200).json(await deleteUser(slug[1]));
            break;
          default:
            res
              .status(405)
              .json({ error: 'Only get, post, put, delete allowed' });
        }
        break;

      case 'wallets':
        switch (req.method) {
          case 'GET':
            res.status(200).json(await getWallet(slug[1]));
            break;
          case 'POST':
            res
              .status(200)
              .json(await addWallet(slug[1], req.body.wallet as IWallet));
            break;
          case 'PUT':
            res
              .status(200)
              .json(await updateWallet(slug[1], req.body.wallet as IWallet));
            break;
          case 'DELETE':
            res
              .status(200)
              .json(await removeWallet(slug[1], req.body.wallet as IWallet));
            break;
          default:
            res
              .status(405)
              .json({ error: 'Method not allowed, only get, post, delete' });
        }
        break;

      case 'contacts':
        switch (req.method) {
          case 'GET':
            res.status(200).json(await getContact(slug[1]));
            break;
          case 'POST':
            res
              .status(200)
              .json(await addContact(slug[1], req.body.contact as IContact));
            break;
          case 'PUT':
            res
              .status(200)
              .json(await updateContact(slug[1], req.body.contact as IContact));
            break;
          case 'DELETE':
            res
              .status(200)
              .json(await removeContact(slug[1], req.body.contact as IContact));
            break;
          default:
            res
              .status(405)
              .json({ error: 'Method not allowed, only get, post, delete' });
        }
        break;

      case 'lookup':
        if (req.method !== 'POST') {
          res
            .status(405)
            .json({ error: 'Method not allowed, only post for lookup' });
        }
        switch (slug[1]) {
          case 'user':
            res
              .status(200)
              .json(await getObjectIdOfUser(req.body.user as IUser));
            break;
          case 'wallet':
            res
              .status(200)
              .json(
                await getObjectIdOfWallet(
                  req.body.user as IUser,
                  req.body.wallet as IWallet,
                ),
              );
            break;
          case 'contact':
            res
              .status(200)
              .json(
                await getObjectIdOfContact(
                  req.body.user as IUser,
                  req.body.contact as IContact,
                ),
              );
            break;

          case 'account':
            res.status(200).json(
              await getObjectIdOfAccount(
                req.body.user as IUser,
                req.body.account as IPlaidAccount,
              ),
            );
            break;

          default:
            res
              .status(405)
              .json({
                error: 'Method not allowed, only user, wallet, contact, or account',
              });
        }
        break;

      case 'plaid':
        switch (req.method) {
          case 'POST':
            res.status(200).json(await addPlaidAccount(slug[1], req.body.account as IPlaidAccount));
            break;
          case 'DELETE':
            res.status(200).json(await removePlaidAccount(slug[1], req.body.account as IPlaidAccount));
            break;
          default:
            res
            .status(405)
            .json({
              error: 'Method not allowed, only post or delete for plaid',
            });
        }
        break;


      default:
        res
          .status(404)
          .json({
            error: 'Method not allowed, only users, wallets, or contacts',
          });
    }
  }
  catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
}
