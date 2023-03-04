import IDetailedCoinInfo from "./IDetailedCoinInfo";
import IWallet from "./IWallet";

export default interface IDetailedWallet extends IWallet {
    detailedCoinInfos: IDetailedCoinInfo[]
    quoteCurrency: string;
}