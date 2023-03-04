import React, { Component } from 'react';
import { Box, Chip, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import FullPageDrawer from './FullPageDrawer';
import Contact from './Contact';
import BasicLayout from './BasicLayout';
import AddContact from './AddContact';
import IWrappedContact from './types/IWrappedContact';
import INavBarProps from './types/props/INavBarProps';
import IBasicLayoutProps from './types/props/IBasicLayoutProps';
import IFullPageDrawerProps from './types/props/IFullPageDrawerProps';


export default function ContactList({ close, wrappedContacts } : { close: () => void, wrappedContacts: IWrappedContact[] }) {
    const [contactInfoDrawerOpen, setContactInfoDrawerOpen] = React.useState(false);
    const [addContactDrawerOpen, setAddContactDrawerOpen] = React.useState(false);
    const [selectedContact, setSelectedContact] = React.useState<IWrappedContact|null>(null);

    const openContactInfoDrawer = (contact: IWrappedContact) => {
        setSelectedContact(contact);
        setContactInfoDrawerOpen(true);
    }

    const closeContactInfoDrawer = () => {
        setSelectedContact(null);
        setContactInfoDrawerOpen(false);
    }

    const openAddContactDrawer = () => {
        setAddContactDrawerOpen(true);
    }

    const closeAddContactDrawer = () => {
        setAddContactDrawerOpen(false);
    }


    const contactListNavBarProps = {
        crumbName: "Wallets",
        crumbNameClickHandler: close,
        navTitle: "Contacts",
        navActionElement: "Add",
        navActionClickHandler: openAddContactDrawer,
    } as INavBarProps;

    const addContactDrawerProps = {
        anchor: "bottom",
        open: addContactDrawerOpen,
        pageContent: (<AddContact close={closeAddContactDrawer}/>),
    } as IFullPageDrawerProps;

    const contactInfoDrawerProps = {
        anchor: "left",
        open: contactInfoDrawerOpen,
        pageContent: (selectedContact ? <Contact close={closeContactInfoDrawer} contact={selectedContact}/> : <></>),
    } as IFullPageDrawerProps;

    const contactListBodyContent = (
        <>
            <List>
                {wrappedContacts.map((contact: IWrappedContact) => (
                    <Box key={contact.address}>
                        <ListItem onClick={() => openContactInfoDrawer(contact)}>
                            <ListItemButton >
                                <ListItemText primary={contact.name} />
                                {contact.isFromLens ? <Chip style={{backgroundColor:"#ABFE2C"}} icon={<span>🌿</span>} label="From Lens" /> : <></>}
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </Box>
                ))}
            </List>
        </>
    );

    const contactListBasicLayoutProps = {
        navBarProps: contactListNavBarProps,
        bodyContent: contactListBodyContent,
    } as IBasicLayoutProps;


    return (
        <>
            <BasicLayout basicLayoutProps={contactListBasicLayoutProps} />
            <FullPageDrawer fullPageDrawerProps={addContactDrawerProps} />
            <FullPageDrawer fullPageDrawerProps={contactInfoDrawerProps} />
        </>
    );
}

