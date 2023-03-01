import React, { Component } from 'react';
import BasicLayout from '@/components/BasicLayout';
import logo from '/public/theWaleWalletLogo.jpeg';

import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Wallets() {

    const showContacts: any = () => {
        console.log("show contacts");
    }

    const navContent = (
        <>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <h2>Wallets</h2>
                <FontAwesomeIcon icon={faAddressBook} size="lg" onClick={() => showContacts()}/>
            </div>
        </>
    );
    const bodyContent = (
        <>
        </>
    );

    return (
        <BasicLayout navContent={navContent} bodyContent={bodyContent} />
    );
}

export default Wallets;

