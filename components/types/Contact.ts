import IAddressTrio from "./AddressTrio";

export default interface IContact{
    name: string, 
    wallets: IAddressTrio[],
    isFavorite: boolean,
}