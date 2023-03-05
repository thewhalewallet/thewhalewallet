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

async function getFollowingByWalletAddress(walletAddress: string) {
    let result = await client.query({
        query: getFollowing,
        variables: { ethereumAddress: walletAddress }
    });
    return result.data.following;
}





export { getLensProfileByWalletAddress, getFollowingByWalletAddress, getEnsByWalletAddress};