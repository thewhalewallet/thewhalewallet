import IWallet from "./IWallet";
import IContact  from "./IContact";
import IPlaidAccount from "./IPlaidAccount";
import IPlaidTx from "./IPlaidTx";
export default interface IUser {
    _id: string;
    email: string;
    name: string;
    image: string;
    wallets: IWallet[];
    contacts: IContact[];
    plaid_access_token: string;
    plaid_item_id: string;
    plaid_account: IPlaidAccount[];
    plaid_tx: IPlaidTx[];
  }