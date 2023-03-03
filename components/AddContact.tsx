import React, { Component } from 'react';

import { TextField } from '@mui/material';
import AddressTrio from './AddressTrio';
import IAddressTrio from './types/AddressTrio';

const addressTrios: IAddressTrio[] = []

const potentialAddressTrio = {
    display: "flex",
    justifyContent: "right",
}


export default function AddContact() {
    let [addressTrios, setAddressTrios] = React.useState<IAddressTrio[]>([]);
    let [contactName, setContactName] = React.useState<string>("");
    let [potentialWallet, setPotentialWallet] = React.useState<string>("");

    const addAddressTrio = () => {
        let trio = {walletAddress: "wallet", ensAddress: "ens", lensAddress: "lens"} as IAddressTrio;
        setAddressTrios([...addressTrios, trio])
    }

    return (
        <div>
            <TextField fullWidth 
                placeholder="Name" 
                id="contact_name" 
                onChange={(e)=>{setContactName(e.target.value)}}
            />
            <div>
                <TextField fullWidth
                    placeholder="Wallet adress, ENS or LENS" 
                    id="contact_address" 
                    onChange={(e)=>{setPotentialWallet(e.target.value)}}
                />
                {/* Show address trio created when typing in textfield */}
                <div style={potentialAddressTrio} onClick={()=>{addAddressTrio()}}>
                    <AddressTrio
                        addressTrio={{
                            walletAddress:"0xadfalskweo23909fnafn23d",
                            ensAddress:"verygoodname.eth",
                            lensAddress:"verygoodname.lens.eth"
                        }
                        }
                    />
                </div>
                <div>{potentialWallet}</div>
                <div>
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
    );
}

// ENS



