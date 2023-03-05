import IUser from '@/components/types/IUser';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react';
import { useEffect, useState } from 'react';
import UserHandler from '@/components/utils/UserHandler.service';
import React from 'react';
import WalletsDashboard from '@/components/WalletsDashboard';
import { getUserByEmail } from '@/components/utils/contact.service';
import { noUser } from '@/components/types/hardcoded/noUser';
import WalletDisplay from '@/components/WalletDisplay';

interface IUserContext{
    loggedUser: IUser;
    refreshLoggedUser: () => void;
}

export const UserContext = React.createContext<IUserContext>({
    loggedUser: {} as IUser,
    refreshLoggedUser: () => {},
});

export default function Dashboard() {
    const [currentUser, setCurrentUser] = useState<IUser>(noUser);

    useEffect(() => {
        const init = async () => {
            await getUserByEmail({ user_email: "fake_email@gmail.com"}).then((user) => {
                setCurrentUser(user);
            });
        }
        init();
    }, [currentUser]);


    const refreshLoggedUser = async () => {
        console.log("refreshing logged user");
    };
        
    return (
        <div className="takespace">
            <UserContext.Provider value={{loggedUser: currentUser, refreshLoggedUser: refreshLoggedUser}}>
                <WalletsDashboard />
                <WalletDisplay />
            </UserContext.Provider>
            <UserHandler setCurrentUser={setCurrentUser} />
        </div>
    );
}

