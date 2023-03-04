import Navbar from '@/components/Navbar';
import PlaidDisplay from '@/components/plaid/PlaidDisplay';
import IUser from '@/components/types/IUser';
import WalletDisplay from '@/components/WalletDisplay';
import { DynamicContextProvider, useDynamicContext } from '@dynamic-labs/sdk-react';
import { useEffect, useState } from 'react';
import UserHandler from '@/components/utils/UserHandler.service';
import React from 'react';
import WalletsDashboard from '@/components/WalletsDashboard';

export const UserContext = React.createContext({} as IUser);

export default function Dashboard() {
    const [currentUser, setCurrentUser] = useState<IUser>({} as IUser);

    useEffect(() => {
        //Fetch user from database
        // let user = await getUser();
        // setCurrentUser(user);
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
            <UserContext.Provider value={currentUser}>
                <WalletsDashboard />
            </UserContext.Provider>
            {/* <PlaidDisplay /> */}
            <UserHandler setCurrentUser={setCurrentUser} />
        
            {/* <Navbar /> */}
            {/* <div className="hero min-h-screen min-w-max bg-base-100"> */}
            <div className='flex grow-1 justify-center bg-slate-300'>
                {/* <PlaidChart user={currentUser} /> */}
                <DynamicWidget variant='dropdown'/>
                <WalletDisplay />
            </div>

                {/* <WalletDisplay /> */}
                {/* <PlaidDisplay user={currentUser}/> */}
            {/* </div> */}
        </div>
    );
}

