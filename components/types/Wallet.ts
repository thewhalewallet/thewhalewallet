import { float } from "aws-sdk/clients/cloudfront";
import IAddressTrio from "./AddressTrio";

export default interface IWallet {
    addressTrio: IAddressTrio,
    balance: float,
}