import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { Box } from '@mui/material';
import React from 'react';
import INavBarProps from './types/props/INavBarProps';


export default function Navbar({ navBarProps } : { navBarProps: INavBarProps }) {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-max rounded-full">
                            <Image className="object-scale-down" src="/logo.jpeg" alt='' width={512} height={512} />
                        </div>
                    </label>
            </div>
            <div className="flex-1" onClick={() => {
                router.push("/")
            }}>
                <a className="btn btn-ghost normal-case text-l text-sky-700">WhaleWallet</a>
            </div>
            <div className="flex-1">
                <DynamicWidget />
            </div>
        </div>
    );
}





