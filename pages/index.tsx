import Navbar from '@/components/Navbar';
import PlaidDisplay from '@/components/plaid/PlaidDisplay';
import IUser from '@/components/types/IUser';
import WalletDisplay from '@/components/WalletDisplay';
import { DynamicContextProvider, useDynamicContext } from '@dynamic-labs/sdk-react';
import { useState } from 'react';
import UserHandler from '@/components/utils/UserHandler.service';

export default function Dashboard() {

    const [currentUser, setCurrentUser] = useState<IUser>({} as IUser);
    
    return (
        <div>
        <DynamicContextProvider
            settings={{
                appLogoUrl:
                    'https://pasteboard.co/bilDMbPIERqf.png',
                appName: 'The Whale Wallet',
                environmentId: '488307e9-c2a6-4270-a7ac-2fa4915752f1',
                multiWallet: true,
                shadowDOMEnabled: true,
            }}
        >
            <Navbar />
            <div className="hero min-h-screen bg-base-100">
                <div className="hero-content text-center">

                    {/* <WalletDisplay /> */}
                    <PlaidDisplay />

                </div>
            </div>
            <UserHandler setCurrentUser={setCurrentUser} />
        </DynamicContextProvider>
        </div>
    );
}

