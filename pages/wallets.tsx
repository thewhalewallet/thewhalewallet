import React, { Component } from 'react';
import BasicLayout from '@/components/BasicLayout';
import logo from '/public/theWaleWalletLogo.jpeg';

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import FullPageDrawer from '@/components/FullPageDrawer';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ContactList from '@/components/contactList';


const hardcodedContacts = [
    {
        id: 1,
        name: "John Doe",
        address: "0x1234567890",
    },
    {
        id: 2,
        name: "Jane Doe",
        address: "0x1234567890",
    },
    {
        id: 3,
        name: "John Smith",
        address: "0x1234567890",
    },
];

function Wallets() {

    let [contactsOpen, setContactsOpen] = React.useState(false);

    const showContacts = () => {
        console.log("showContacts");
        setContactsOpen(true);
    }

    const closeContacts = () => {
        console.log("closeContacts");
        setContactsOpen(false);
    }

    const navContent = (
        <>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <h2>Wallets</h2>
                <FontAwesomeIcon icon={faAddressBook} size="lg" onClick={() => showContacts()}/>
            </div>
        </>
    );

    const [cryptoDisplayOption, setCryptoDisplayOption] = React.useState("Wallets");
    const totalBalance = "0.00"; // TODO: Get all wallets and bank accounts and add them up


    const bodyContent = (
        <div>
            {/* Total balance */}
            <div style={{display:"flex", justifyContent:"center"}}>
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Total Balance</div>
                        <div className="stat-value">{totalBalance}</div>
                        {/* <div className="stat-desc">21% more than last month</div> */}
                    </div>
                </div>
            </div>
            {/* Crypto wallets */}
            <div>
                <div style={{display: "flex"}}>
                    <h3>Cryptos</h3>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button>Wallets</Button>
                        <Button>Cryptos</Button>
                    </ButtonGroup>

                </div>
            </div>
        </div>
        
    );

    return (
        <div>
            <BasicLayout navContent={navContent} bodyContent={bodyContent} />
            <FullPageDrawer
                anchor="left"
                close={closeContacts}
                removeChevron={false}
                crumbName="Wallets"
                navTitle="Contacts"
                navActionButton={
                    <>
                        <FontAwesomeIcon icon={faPlus} size="lg" onClick={}/>
                    </>
                }
                bodyContent={(<ContactList contacts={hardcodedContacts}/>)}
                open={contactsOpen}
            />
        </div>
    );
}

export default Wallets;

