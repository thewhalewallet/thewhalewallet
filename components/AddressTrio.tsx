import { Box, Button, Chip, Divider, List, ListItem, ListItemText } from '@mui/material';
import React, { Component } from 'react';
import { RoundedBox } from './RoundedBox';

import IAddressTrio from './types/AddressTrio';




export default function AddressTrio({addressTrio}: {addressTrio: IAddressTrio}) {

    const refreshContact = () => {
        // Do something that takes a while
        let i = 0;
        while (i < 10000) {
            console.log("refreshing");
            i += 1;
        }
    }

 

    return (
        <RoundedBox 
            roundedBoxProps={{
                bgColor: "lightgrey",
                borderColor: "black",
                width: "100%",
                children: (
                    <div>
                        <div className="stat-title">Wallet Address</div>
                        <div style={{overflow: "hidden", flexWrap: "nowrap", whiteSpace: "nowrap", textOverflow: "ellipsis"}}
                        >
                            {addressTrio.address}
                        </div>
                        <Divider />
                        <div className="stat-title">ENS</div>
                        <div className="">{addressTrio.ens || "not found (click to search)"}</div>
                        <Divider />
                        <div className="stat-title">LENS</div>
                        <div className="">{addressTrio.lens}</div>
                    </div>
                ),
                onClickHandler: refreshContact,
                loadingBackdrop: true,
            }}
        />
    );
}

