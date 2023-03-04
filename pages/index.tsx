import IUser from '@/components/types/IUser';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react';
import { useEffect, useState } from 'react';
import UserHandler from '@/components/utils/UserHandler.service';
import React from 'react';
import WalletsDashboard from '@/components/WalletsDashboard';
import { getUserByEmail } from '@/components/utils/contact.service';
import { noUser } from '@/components/types/hardcoded/noUser';

export const UserContext = React.createContext({} as IUser);
import { PlaidChart } from '@/components/plaid/PlaidChart';
import WalletDisplay from '@/components/WalletDisplay';

export default function Dashboard() {
    const [currentUser, setCurrentUser] = useState<IUser>(noUser);

    useEffect(() => {
        const init = async () => {
            await getUserByEmail({ user_email: "fake_email@gmail.com"}).then((user) => {
                setCurrentUser(user);
            });
        } 
        init();  
    }, []);

    
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
                    <PlaidDisplay user={currentUser}/>

                </div>
            </div>
            <UserHandler setCurrentUser={setCurrentUser} />
        </div>
    );
}

