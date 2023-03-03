import { Button, Chip } from '@mui/material';
import { width } from '@mui/system';
import React, { Component } from 'react';

import IAddressTrio from './types/AddressTrio';

const trioBoxStyle = {
    overflowY: "scroll",
    display: "flex",
    border: "1px solid black",
    borderRadius: "4px",
    width: "100%",
   
} as any;

const addressThing = {
    width: "200px",
    margin: "4px",
} as any;

function AddressChip({label} : {label: string}) {
    return (
        <Chip style={addressThing} label={label} />
    );
}

export default function AddressTrio({addressTrio}: {addressTrio: IAddressTrio}) {
    return (
        <div style={trioBoxStyle}>
            <AddressChip label={"Wallet: " + addressTrio.walletAddress} />
            <AddressChip label={"ENS: " + addressTrio.ensAddress} />
            <AddressChip label={"LENS: " + addressTrio.lensAddress} />
            {/* <Button onClick={() => {openSendFundModal}}>Send funds</Button> */}
        </div>
    );
}

