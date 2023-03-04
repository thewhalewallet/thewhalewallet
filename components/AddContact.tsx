import React, { Component } from 'react';

import { Button, TextField } from '@mui/material';
import AddressTrio from './AddressTrio';
import IAddressTrio from './types/AddressTrio';

import { isEthWalletAddress, isEthENSAddress, isEthLENSAddress } from '@/components/utils/WalletAddresses';

import { getLensProfileByWalletAddress } from '@/components/utils/wallet.service';

import styles from './AddContact.module.css'
import BasicLayout, { IBasicLayoutProps } from './BasicLayout';

import { addContact } from '@/components/utils/contact.service';
import IContact from './types/Contact';

const addressTrios: IAddressTrio[] = []

const potentialAddressTrio = {
    display: "flex",
    justifyContent: "right",
} as any;


export default function AddContact({ close } : { close: () => void }) {
    let [inputContactName, setInputContactName] = React.useState<string>("");
    let [inputAddress, setInputAddress] = React.useState<string>("");
    let [potentialAddressTrio, setPotentialAddressTrio] = React.useState<IAddressTrio | null>(null);

    const reset = () => {
        setInputContactName("");
        setInputAddress("");
        setPotentialAddressTrio(null);
    }

    const cancelClicked = () =>{
        reset();
        close();
    }

    const saveClicked = () => {
        if (potentialAddressTrio != null) {
            let contact = {
                name: inputContactName,
                address: potentialAddressTrio.address,
                ens: potentialAddressTrio.ens,
                lens: potentialAddressTrio.lens,
                isFavorite: false,
            } as IContact;

            addContact({ user: "jonaksdbsad", contact: contact});
        }
        reset();
        close();
    }

    const inputAddressChanged =  (val: string) => {
        setInputAddress(val);
        potentialAddressChanged(val);
    }

    const potentialAddressChanged = (inputAddress: string) => {
        if (isEthWalletAddress(inputAddress)) {
            // look for LENS from wallet address
            let walletAddress = inputAddress;
            let ensAddress = "";
            getLensProfileByWalletAddress(walletAddress).then((lensProfile) => {
                let lensAddress = lensProfile?.handle || "";
                setPotentialAddressTrio({address: walletAddress, ens: ensAddress, lens: lensAddress} as IAddressTrio);
            }).catch((err) => {console.log("Error fetching LENS profile: " + err)});
        } else if (isEthENSAddress(inputAddress)) {
            console.log("ENS address");
        } else if (isEthLENSAddress(inputAddress)) {
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
                <TextField className={styles.textField}
                    required
                    label="Name"
                    variant="filled"
                    fullWidth 
                    placeholder="Name" 
                    value={inputContactName}
                    onChange={(e) => {
                        setInputContactName(e.target.value)
                    }}
                />
                <TextField className={styles.textField}
                    required
                    label="Wallet adress, ENS or LENS"
                    variant="filled"
                    fullWidth
                    placeholder="Wallet adress, ENS or LENS" 
                    value={inputAddress} 
                    onChange={(e)=>{inputAddressChanged(e.target.value)}}
                />
                {/* Show address trio created when typing in textfield */}
                <div>
                    {potentialAddressTrio != null ? 
                    <AddressTrio addressTrio={potentialAddressTrio}/>
                    :
                    <></>
                    }
                </div>
            </div>
        ),
    } as IBasicLayoutProps;

    return (
        <BasicLayout basicLayoutProps={addContactBasicLayoutProps} />
    );
}




