import axios, { AxiosResponse } from "axios";
import IWallet from "../types/IWallet";
import { 
    getLensProfileByWalletAddress,
    getEnsByWalletAddress
} from "./wallet.service";

export async function OnLinkSuccessCallback(args: any) {

    let res = await axios.post(`/api/dyn`, {
        uuid: args.user.userId
        });

    let wallets: IWallet[] = [];
    for (let i = 0; i < res.data.count; i++) {
        
        let address = res.data.wallets[i].publicKey;
        let lens = await getLensProfileByWalletAddress(address);
        let ens = await getEnsByWalletAddress(address);

        wallets.push({
                name: res.data.wallets[i].name,
                address: address,
                isFavorite: false,
                ens: ens,
                lens: lens,
        } as IWallet);
    }
    console.log("Wallets" + wallets);
    await axios.put(`/api/db/users`, {
        user: {
            email: args.user.email,
            wallets: wallets
        }
    })
    .catch((error) => {
        console.log(`{failed to update: ${error}`);
    });
}