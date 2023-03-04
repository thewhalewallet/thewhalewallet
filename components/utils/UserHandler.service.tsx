import axios, { AxiosResponse } from 'axios';
import { SetStateAction, useEffect, useState } from 'react';

import IUser from '../types/IUser';
import { useDynamicContext } from '@dynamic-labs/sdk-react';

export default function UserHandler(
    {setCurrentUser}: 
    {
        setCurrentUser: React.Dispatch<React.SetStateAction<IUser>>
    }
    ) {

    const { user: dynUser } = useDynamicContext();

    useEffect(() => {
        const getUser = async () => {

            await axios.post(`/api/db/lookup/user`, {
                user: {
                    email: dynUser?.email,
                }
            })
            .then(async (res: AxiosResponse<string>) => {
                    await axios.get(`/api/db/users/${res.data}`)
                    .then((res: AxiosResponse<IUser>) => {
                        if (res.data && res.status == 200) {
                            setCurrentUser(res.data);
                        }
                    })
                    .catch((error) => {
                        console.log(`failed to get user`);
                    })
            })
            .catch(async (error) => {
               // user does not exist, so create one
                await axios.post(`/api/db/users`, {
                    user: {
                        email: dynUser?.email,
                    }
                })
                .then((res: AxiosResponse<IUser>) => {
                    if (res.data && res.status == 200) {
                        setCurrentUser(res.data);
                    }
                })
                .catch((error) => {
                    console.log(`failed to create new user`);
                })
                });
        };
        if (dynUser) {
            getUser();
        }
    }, [dynUser, setCurrentUser]);

    return (
        <></>
    );
}
