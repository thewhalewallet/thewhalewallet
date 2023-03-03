import React, { Component } from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import FullPageDrawer, { IFullPageDrawerProps } from './FullPageDrawer';
import Contact from './Contact';
import BasicLayout, { IBasicLayoutProps } from './BasicLayout';
import { ITopNavProps } from './TopNav';
import IContact from './types/Contact';
import AddContact from './AddContact';


export default function ContactList({ close, contacts } : { close: () => void, contacts: any }) {
    const [contactInfoDrawerOpen, setContactInfoDrawerOpen] = React.useState(false);
    const [addContactDrawerOpen, setAddContactDrawerOpen] = React.useState(false);
    const [selectedContact, setSelectedContact] = React.useState<IContact|null>(null);

    const openContactInfoDrawer = (contact: IContact) => {
        console.log("open contact info");
        setSelectedContact(contact);
        setContactInfoDrawerOpen(true);
    }

    const closeContactInfoDrawer = () => {
        console.log("close contact info");
        setSelectedContact(null);
        setContactInfoDrawerOpen(false);
    }

    const openAddContactDrawer = () => {
        console.log("open add contact drawer");
        setAddContactDrawerOpen(true);
    }

    const closeAddContactDrawer = () => {
        console.log("close add contact drawer");
        setAddContactDrawerOpen(false);
    }



    const contactListTopNavProps = {
        crumbName: "Wallets",
        crumbNameClickHandler: close,
        navTitle: "Contacts",
        navActionElement: "Add",
        navActionClickHandler: openAddContactDrawer,
    } as ITopNavProps;

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
                {contacts.map((contact: any) => (
                    <ListItem key={contact.id} onClick={() => openContactInfoDrawer(contact)}>
                        <ListItemButton >
                            <ListItemText primary={contact.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );

    const contactListBasicLayoutProps = {
        topNavProps: contactListTopNavProps,
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

