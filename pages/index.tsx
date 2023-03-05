import Navbar from '@/components/Navbar';
import PlaidDisplay from '@/components/plaid/PlaidDisplay';
import IUser from '@/components/types/IUser';
import WalletDisplay from '@/components/WalletDisplay';
import { DynamicContextProvider, useDynamicContext } from '@dynamic-labs/sdk-react';
import { useState } from 'react';
import UserHandler from '@/components/utils/UserHandler.service';
import { PlaidChart } from '@/components/plaid/PlaidChart';

export default function Dashboard() {

    const [currentUser, setCurrentUser] = useState<IUser>({} as IUser);
    
    return (
        <>
            <UserHandler setCurrentUser={setCurrentUser} />

            <Navbar />
            {/* <div className="hero min-h-screen min-w-max bg-base-100"> */}
            <div className='flex flex-auto flex-col place-items-center'>
                <PlaidChart user={currentUser} />
            </div>
                {/* <WalletDisplay /> */}
                {/* <PlaidDisplay user={currentUser}/> */}
            {/* </div> */}
        </>
    );
}

