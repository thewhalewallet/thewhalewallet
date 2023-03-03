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
   
}

const addressThing = {
    width: "200px",
    margin: "4px",
}

function AddressChip({label} : {label: string}) {
    return (
        <Chip style={addressThing} label={label} />
    );
}

export default function AddressTrio({key, addressTrio}: {key: string, addressTrio: IAddressTrio}) {
    return (
        <div>
            <AddressChip label={"Wallet Address: " + addressTrio.walletAddress} />
            <AddressChip label={"ENS Address: " + addressTrio.ensAddress} />
            <AddressChip label={"LENS Address: " + addressTrio.lensAddress} />
            {/* <Button onClick={() => {openSendFundModal}}>Send funds</Button> */}
        </div>
    );
}

