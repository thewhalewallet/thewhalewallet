import { Box, Button, Divider, List, ListItem, ListItemButton, ListItemText, Modal } from '@mui/material';
import React, { Component } from 'react';
import AddressTrio from './AddressTrio';
import BasicLayout, { IBasicLayoutProps } from './BasicLayout';
import FullPageDrawer, { IFullPageDrawerProps } from './FullPageDrawer';
import SendFundsModal from './SendFundsModal';
import IAddressTrio from './types/AddressTrio';
import IContact from './types/Contact';

import { addContact } from './utils/contact.service';

export default function Contact({close, contact}: {close: () => void, contact: IContact}) {
    let [editContactDrawerOpen, setEditContactDrawerOpen] = React.useState(false);
    let [sendFundsModalOpen, setSendFundsModalOpen] = React.useState(false);

    const openEditContactDrawer = () => {
        setEditContactDrawerOpen(true);
    }

    const closeEditContactDrawer = () => {
        setEditContactDrawerOpen(false);
    }

    const openSendFundModal = () => {
        setSendFundsModalOpen(true);
    }

    const closeSendFundsModal = () => {
        setSendFundsModalOpen(false);
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
        topNavProps: {
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
                {contact.fromLens ? 
                    <Button style={{width: "100%", backgroundColor:"#ABFE2C"}}
                        onClick={saveLensContact}
                    >
                        Add LENS contact to account
                    </Button>
                    :
                    <></>
                }



                <Button onClick={openSendFundModal}>Open Modal</Button>
                <SendFundsModal opened={sendFundsModalOpen} handleClose={closeSendFundsModal} />
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

