import IContact from "./IContact";

export default interface IWrappedContact extends IContact {
    isFromLens: boolean;
}