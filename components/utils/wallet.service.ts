import { 
    client, 
    defaultProfileByWalletAddress, 
    ensByProfileId 
} from './LensProfile'

async function getLensProfileByWalletAddress(walletAddress: string) {
    let result = await client.query({
        query: defaultProfileByWalletAddress,
        variables: { ethereumAddress: walletAddress }
    });
    return result.data.defaultProfile;
}


export { getLensProfileByWalletAddress };