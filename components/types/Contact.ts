import IAddressTrio from "./AddressTrio";

export default interface IContact{
    name: string, 
    email: string,
    phone: string,
    wallets: IAddressTrio[]
}