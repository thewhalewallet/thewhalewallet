

export function getEthAddressBalance(walletAddress: string) {
    const url = `https://api.covalenthq.com/v1/eth-mainnet/address/${walletAddress}/balances_v2/?key=${process.env.NEXT_PUBLIC_COVALENT_KEY}`;
    return fetch(url).then(res=>res.json());
}
