import { Box, Button, Chip, Divider, List, ListItem, ListItemText } from '@mui/material';
import React, { Component } from 'react';

import IAddressTrio from './types/AddressTrio';



export default function AddressTrio({addressTrio}: {addressTrio: IAddressTrio}) {
    return (
        <List sx={{ width: '100%', bgcolor: 'lightgrey' }}>
            <ListItem>
                <ListItemText sx={{ textOverflow: "ellipsis" }} primary="Wallet Address" secondary={addressTrio.address} />
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemText sx={{ textOverflow: "ellipsis" }} primary="ENS" secondary={addressTrio.ens} />
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemText sx={{ textOverflow: "ellipsis" }} primary="LENS" secondary={addressTrio.lens} />
            </ListItem>
      </List>
    );
}

