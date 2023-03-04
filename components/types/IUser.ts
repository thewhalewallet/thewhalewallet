import IWallet from "./IWallet";
import IContact  from "./IContact";
import IPlaidAccount from "./IPlaidAccount";
export default interface IUser {
    _id: string;
    email: string;
    name: string;
    image: string;
    plaid_access_token: string;
    plaid_item_id: string;
    plaid_account: IPlaidAccount[];
    wallets: IWallet[];
    contacts: IContact[];
  }