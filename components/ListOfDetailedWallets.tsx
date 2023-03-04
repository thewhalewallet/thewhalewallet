import { IDetailedWallet } from '@/pages/wallets';
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import React from 'react';
import CollaspeListItem from './CollaspeListItem';

export default function ListOfDetailedWallets({ detailedWallets }: { detailedWallets: IDetailedWallet[]}) {

    return (
    <>
        <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', boxShadow: 4 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
            <ListSubheader component="div" id="nested-list-subheader">
                Wallets
            </ListSubheader>
            }
        >
        {
            detailedWallets.map((detailedWallet) => {
                return (
                    <CollaspeListItem key={detailedWallet.addressTrio.address} detailedWallet={detailedWallet} />    
                )
            })
        }
        </List>
    </>
    );
}
