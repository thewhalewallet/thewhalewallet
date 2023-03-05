import axios from 'axios';
import IWallet from '../types/IWallet';
import { getUserIdByEmail } from './contact.service';
import { 
    client, 
    defaultProfileByWalletAddress, 
    ensByProfileId,
    getFollowing
} from './LensProfile'

const { ethers } = require("ethers");

async function getEnsByWalletAddress(walletAddress: string) {
    const provider = new ethers.providers.AlchemyProvider('mainnet', process.env.NEXT_PUBLIC_ALCHEMY_KEY);
    let res = await provider.lookupAddress(walletAddress);
    if (res) {
        return res
    }
    return '';
}

async function getLensProfileByWalletAddress(walletAddress: string) {
    let res = await client.query({
        query: defaultProfileByWalletAddress,
        variables: { ethereumAddress: walletAddress }
    });
    if (res.data.defaultProfile) {
        return res.data.defaultProfile;
    }
    return '';
}

export async function getFollowingByWalletAddress(walletAddress: string) {
    let result = await client.query({
        query: getFollowing,
        variables: { ethereumAddress: walletAddress }
    });
    return result.data.following;
}

export async function addWalletByEmail({email_address, wallet} : {email_address: string, wallet: IWallet}) {
    let user_id = await getUserIdByEmail({user_email: email_address});
    console.log(user_id);
    return await axios.post(`/api/db/wallets/${user_id}`, { wallet: wallet }).catch((err) => {
        console.log(err);
    });
}









export { getLensProfileByWalletAddress, getFollowingByWalletAddress, getEnsByWalletAddress};