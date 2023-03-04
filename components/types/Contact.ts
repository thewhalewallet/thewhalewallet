import IAddressTrio from "./AddressTrio";

export default interface IContact{
    name: string, 
    address: string,
    ens: string, 
    lens: string,
    isFavorite: boolean,
    fromLens?: boolean,
}
