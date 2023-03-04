import { 
    client, 
    defaultProfileByWalletAddress, 
    ensByProfileId,
    getFollowing
} from './LensProfile'

async function getLensProfileByWalletAddress(walletAddress: string) {
    let result = await client.query({
        query: defaultProfileByWalletAddress,
        variables: { ethereumAddress: walletAddress }
    });
    return result.data.defaultProfile;
}

async function getFollowingByWalletAddress(walletAddress: string) {
    let result = await client.query({
        query: getFollowing,
        variables: { ethereumAddress: walletAddress }
    });
    return result.data.following;
}





export { getLensProfileByWalletAddress, getFollowingByWalletAddress };