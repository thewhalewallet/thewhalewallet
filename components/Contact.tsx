import { Box, Button, Divider, List, ListItem, ListItemButton, ListItemText, Modal } from '@mui/material';
import React from 'react';
import AddressTrio from './AddressTrio';
import BasicLayout from './BasicLayout';
import FullPageDrawer from './FullPageDrawer';
import IAddressTrio from './types/AddressTrio';
import IWrappedContact from './types/IWrappedContact';
import IBasicLayoutProps from './types/props/IBasicLayoutProps';
import IFullPageDrawerProps from './types/props/IFullPageDrawerProps';

import { addContact } from './utils/contact.service';
import { SendFundModalContext } from './WalletsDashboard';

export default function Contact({close, contact}: {close: () => void, contact: IWrappedContact}) {
    let [editContactDrawerOpen, setEditContactDrawerOpen] = React.useState(false);

    const openEditContactDrawer = () => {
        setEditContactDrawerOpen(true);
    }

    const closeEditContactDrawer = () => {
        setEditContactDrawerOpen(false);
    }

    const saveLensContact = () => {
        addContact({user: "jonaksdbsad", contact: contact});
    }

    const contactAddressTrio = {
        address: contact.address,
        ens: contact.ens,
        lens: contact.lens,
    } as IAddressTrio;
    
    const contactBasicLayoutProps = {
        navBarProps: {
            crumbName: "Contacts",
            crumbNameClickHandler: close,
            navTitle: "",
            navActionElement: "Edit",
            navActionClickHandler: openEditContactDrawer
        },
        bodyContent: (
            <>
                <List sx={{ width: '100%', bgcolor: 'lightgrey' }}>
                    <ListItem>
                        <ListItemText primary="Name" secondary={contact.name} />
                    </ListItem>
                </List>
                <AddressTrio addressTrio={contactAddressTrio} />

                {/* If lens contact, add button to add to database */}
                {contact.isFromLens ? 
                    <Button style={{width: "100%", backgroundColor:"#ABFE2C"}}
                        onClick={saveLensContact}
                    >
                        Add LENS contact to account
                    </Button>
                    :
                    <></>
                }
                <SendFundModalContext.Consumer>
                    {value => 
                        <Button onClick={value}
                            style={{width: "100%"}}
                        >
                            Send Funds To {contact.name}
                        </Button>
                    }
                </SendFundModalContext.Consumer>
            </>
        ),
    } as IBasicLayoutProps;

    const editContactDrawerProps = {
        anchor: "bottom",
        open: editContactDrawerOpen,
        pageContent: (<Button onClick={closeEditContactDrawer}>Close</Button>),
    } as IFullPageDrawerProps;

    return (
        <>
            <BasicLayout basicLayoutProps={contactBasicLayoutProps} />
            <FullPageDrawer fullPageDrawerProps={editContactDrawerProps} />
        </>
    );
}

