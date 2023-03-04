import IContact from "../IContact";
import IUser from "../IUser";
import IWallet from "../IWallet";

const hardcodedContacts: IContact[] = [
    {
        _id: "1",
        name: "Jonas",
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        ens: "jonas.eth",
        lens: "jonas.lens.eth",
        isFavorite: true,
    },
    {
        _id: "2",
        name: "Thomas",
        address: "0x5FbDB2315678afe31367f032d93F642f64180bb3",
        ens: "thomas.eth",
        lens: "thomas.lens.eth",
        isFavorite: false,
    },
    {
        _id: "3",
        name: "Jens",
        address: "0xa408DDD1BeA8f798449e79C0e8A25d8b301e526b",
        ens: "jens.eth",
        lens: "jens.lens.eth",
        isFavorite: false,
    },
];

const userWallets: IWallet[] = [
    {
        _id: "1",
        name: "Wallet 1",
        address: "0x0dFFCe077ec519615C8Dd7Ee386e1dDAa596EB23",
        ens: "madhuran.eth",
        lens: "madhuran.lens",
        isFavorite: true,
    },
    {
        _id: "2",
        name: "Wallet 2",
        address: "0xCA30F395F269078149520df119e74eAd0e415c49",
        ens: "thomas.eth",
        lens: "thomas.lens",
        isFavorite: false,
    },
];    

export const user: IUser = {
    _id: "1",
    name: "Madhuran",
    email: "madhi@gmail.com",
    image: "image.url",
    plaid_access_token: "plaid_access_token",
    plaid_item_id: "plaid_item_id",
    wallets: userWallets,
    contacts: hardcodedContacts,
};
