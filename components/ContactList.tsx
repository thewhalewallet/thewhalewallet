import React, { Component } from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import FullPageDrawer from './FullPageDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function ContactList({ contacts } : { contacts: any }) {
    const [contactDrawerOpen, setContactDrawerOpen] = React.useState(false);
    const [selectedContact, setSelectedContact] = React.useState(null);

    const openContact = (contact: any) => {
        console.log("open contact");
        setSelectedContact(contact);
        setContactDrawerOpen(true);
    }

    return (
        <div>
            <List>
                {contacts.map((contact: any) => (
                    <ListItem key={contact.id} onClick={() => openContact(contact)}>
                        <ListItemButton >
                            <ListItemText primary={contact.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <FullPageDrawer
                anchor = "left"
                close={()=>{setContactDrawerOpen(false)}}
                removeChevron={false}
                crumbName="Contacts"
                navTitle="Contact"
                navActionButton={
                    <>
                        <div>Edit</div>
                    </>
                }
                bodyContent={(<div>contact</div>)}
                open={contactDrawerOpen}
            />
        </div>
    );
}

