import IDetailedWallet from "./IDetailedWallet";
import IUser from "./IUser";
import IWrappedContact from "./IWrappedContact";

export default interface IWrappedUser extends IUser {
    detailedWallets: IDetailedWallet[];
    wrappedContacts: IWrappedContact[];
}