import mongoose, { Schema } from "mongoose";

export interface IContact {
    name: string;
    address: string;
    ens: string;
    lens: string;
    isFavorite: boolean;
}

export interface IWallet {
    name: string;
    address: string;
    isFavorite: boolean;
    ens: string;
    lens: string;
  }
  
export interface IUser {
    email: string;
    name: string;
    image: string;
    plaid_access_token: string;
    plaid_item_id: string;
    wallets: IWallet[];
    contacts: IContact[];
  }
  
const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true},
    name: { type: String, required: false, default: '' },
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
    contacts: [
        {
            name: { type: String, required: true },
            address: { type: String, required: true },
            ens: { type: String, required: false, default: ''},
            lens: { type: String, required: false, default: ''},
            isFavorite: { type: Boolean, required: false, default: false },
        }
    ]
  }, {
    methods: {
        async addWallet(wallet: IWallet) {
            this.wallets.push(wallet);
            await this.save();
        },
        async removeWallet(wallet: IWallet) {
            const i = this.wallets.findIndex( (w) => w.address === wallet.address);
            this.wallets.splice(i, 1);
            await this.save();
        },
        async updateWallet(wallet: IWallet) {
            const i = this.wallets.findIndex( (w) => w.address === wallet.address);
            this.wallets[i] = wallet;
            await this.save();
        },
        async addContact(contact: IContact) {
            this.contacts.push(contact);
            await this.save();
        },
        async removeContact(contact: IContact) {
            const i = this.contacts.findIndex( (c) => c.address === contact.address);
            this.contacts.splice(i, 1);
            await this.save();
        },
        async updateContact(contact: IContact) {
            const i = this.contacts.findIndex( (c) => c.address === contact.address);
            this.contacts[i] = contact;
            await this.save();
        },
        async updatePlaid(access_token: string, item_id: string) {
            this.plaid_access_token = access_token;
            this.plaid_item_id = item_id;
            await this.save();
        },
        async updateName(name: string) {
            this.name = name;
            await this.save();
        },
        async updateImage(image: string) {
            this.image = image;
            await this.save();
        },
        async updateEmail(email: string) {
            this.email = email;
            await this.save();
        }
    }
  });

const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);  
export default UserModel;