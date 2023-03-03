import React, { Component } from 'react';

import { Button, TextField } from '@mui/material';
import AddressTrio from './AddressTrio';
import IAddressTrio from './types/AddressTrio';

import { isEthWalletAddress, isEthENSAddress, isEthLENSAddress } from '@/components/utils/WalletAddresses';

import { getLensProfileByWalletAddress } from '@/components/utils/wallet.service';

import styles from './AddContact.module.css'
import BasicLayout, { IBasicLayoutProps } from './BasicLayout';

const addressTrios: IAddressTrio[] = []

const potentialAddressTrio = {
    display: "flex",
    justifyContent: "right",
} as any;


export default function AddContact({ close } : { close: () => void }) {
    let [addressTrios, setAddressTrios] = React.useState<IAddressTrio[]>([]);
    let [contactName, setContactName] = React.useState<string>("");
    let [potentialWallet, setPotentialWallet] = React.useState<string>("");
    let [potentialAddressTrio, setPotentialAddressTrio] = React.useState<IAddressTrio | null>(null);

    const cancelClicked = () =>{
        setContactName("");
        setAddressTrios([]);
        setPotentialAddressTrio(null);
        close();
    }

    const saveClicked = () => {
        console.log("Save clicked");
    }

    const potentialAddressTrioClicked = () => {
        setAddressTrios([...addressTrios, potentialAddressTrio as IAddressTrio])
        setPotentialAddressTrio(null);
    }

    const potentialAddressChanged = async (potentialAddress: string) => {
        if (isEthWalletAddress(potentialAddress)) {
            // look for LENS from wallet address
            console.log("Wallet address");
            let walletAddress = potentialAddress;
            let ensAddress = "";
            let lensProfile = await getLensProfileByWalletAddress(potentialAddress);
            let lensAddress = lensProfile?.handle || "";
            setPotentialAddressTrio({walletAddress, ensAddress, lensAddress} as IAddressTrio);
        } else if (isEthENSAddress(potentialAddress)) {
            console.log("ENS address");
        } else if (isEthLENSAddress(potentialAddress)) {
            console.log("LENS address");
        } else {
            setPotentialAddressTrio(null);
        }
    }

    const addContactBasicLayoutProps = {
        topNavProps: {
            crumbName: "Cancel",
            crumbNameClickHandler: cancelClicked,
            navTitle: "Add Contact",
            navActionElement: "Save",
            navActionClickHandler: saveClicked,
        },
        bodyContent: (
            <div className={styles.addContactBody}>
                <div className="text-s">Name</div>
                <TextField fullWidth 
                    placeholder="Name" 
                    id="contact_name" 
                    onChange={(e) => {
                        setContactName(e.target.value)
                    }}
                />
                <div className={styles.addContactWallet}>
                    <div className="text-s">Wallets</div>
                    <div className={styles.contactWalletAdder}>
                        <TextField fullWidth
                            placeholder="Wallet adress, ENS or LENS" 
                            id="contact_address" 
                            onChange={(e)=>{potentialAddressChanged(e.target.value)}}
                        />
                        {/* Show address trio created when typing in textfield */}
                        <div onClick={()=>{potentialAddressTrioClicked()}}>
                            {potentialAddressTrio != null ? 
                            <div>
                                <div className="text-xs">Click to add wallet</div>
                                <AddressTrio addressTrio={potentialAddressTrio}/>
                            </div>
                            :
                            <></>
                            }
                        </div>
                    </div>
                    <div className={styles.addedContacts}>
                        {/* Show the created address trios */}
                        {addressTrios.map((trio: IAddressTrio)=>(
                            <AddressTrio 
                                key={trio.walletAddress}
                                addressTrio={{
                                    walletAddress: trio.walletAddress,
                                    ensAddress: trio.ensAddress,
                                    lensAddress: trio.lensAddress
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        ),
    } as IBasicLayoutProps;

    return (
        <BasicLayout basicLayoutProps={addContactBasicLayoutProps} />
    );
}




