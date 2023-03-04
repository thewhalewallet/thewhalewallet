import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import PlaidInit from './PlaidInit';

import IUser from '../types/IUser';
import { useDynamicContext, UserProfile } from '@dynamic-labs/sdk-react';

interface IDBUser extends IUser {
    _id: string;
}

export default function PlaidDisplay() {
    const { user: dynUser } = useDynamicContext();
    const [user, setUser] = useState<IDBUser | null>();

    useEffect(() => {
        const getUser = async () => {

            await axios.post(`/api/db/lookup/user`, {
                user: {
                    email: dynUser?.email,
                }
            })
            .then(async (res: AxiosResponse<string>) => {
                    const user: IDBUser | null = await axios.get(`/api/db/users/${res.data}`)
                    .then((res: AxiosResponse<IDBUser>) => {
                        return res.data;
                    })
                    .catch((error) => {
                        console.log(`failed to get user`);
                        return null;
                    })
                    setUser(user);
            })
            .catch(async (error) => {
               // user does not exist, so create one
               const user: IDBUser | null = await axios.post(`/api/db/users`, {
                    user: {
                        email: dynUser?.email,
                    }
                })
                .then((res: AxiosResponse<IDBUser>) => {
                    return res.data;
                })
                .catch((error) => {
                    console.log(`failed to create new user`);
                    return null;
                })
                setUser(user);
                });
        };
        if (dynUser) {
            getUser();
        }
    }, [dynUser]);

    return (
        <div>
            <PlaidInit />
            <p>
                {user?._id}
                {user?.email}
                {user?.plaid_access_token}
            </p>
        </div>
    );
}
