import IContact from "../IContact";
import IWrappedUser from "../IDetailedUser";
import IDetailedWallet from "../IDetailedWallet";
import IWallet from "../IWallet";
import IWrappedContact from "../IWrappedContact";

export const noUser: IWrappedUser = {
    _id: "None",
    name: "None",
    email: "None",
    image: "None",
    plaid_access_token: "None",
    plaid_item_id: "None",
    plaid_account: [],
    plaid_tx: [],
    detailedWallets: [] as IDetailedWallet[],
    wrappedContacts: [] as IWrappedContact[],
    wallets: [] as IWallet[],
    contacts: [] as IContact[],
};
