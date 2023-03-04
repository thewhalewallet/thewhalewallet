import { useDynamicContext } from "@dynamic-labs/sdk-react";

export default function WalletDisplay() {
    const { connectedWallets: wallets } = useDynamicContext();

    if (!wallets) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {wallets.map((wallet) => {
                return (
                    <div key={wallet!.id}>
                        <div>{wallet!.address}</div>
                    </div>
                );
            }
            )}
        </div>
    );
}