function isEthWalletAddress(address: string): boolean {
  return address.length === 42 && address.startsWith('0x');
}

function isEthENSAddress(address: string): boolean {
  return address.length >= 7 && address.endsWith('.eth');
}

function isEthLENSAddress(address: string): boolean {
  return address.length >= 7 && address.endsWith('.lens');
}

export {isEthWalletAddress, isEthENSAddress, isEthLENSAddress};