import IWallet from "./IWallet";
import IContact  from "./IContact";

export default interface IUser {
    _id: string;
    email: string;
    name: string;
    image: string;
    plaid_access_token: string;
    plaid_item_id: string;
    wallets: IWallet[];
    contacts: IContact[];
  }