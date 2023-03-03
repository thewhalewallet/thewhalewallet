import React, { Component } from 'react';
import BasicLayout from '@/components/BasicLayout';

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import FullPageDrawer from '@/components/FullPageDrawer';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ContactList from '@/components/ContactList';
import AddContact from '@/components/AddContact';

import { ConnectButton } from '@rainbow-me/rainbowkit';

import { ethers } from 'ethers';

import { InjectedConnector } from '@wagmi/core/connectors/injected';
import { useAccount, useConnect, useEnsName, useBalance, useDisconnect } from 'wagmi';
import IAddressTrio from '@/components/types/AddressTrio';
import IWallet from '@/components/types/Wallet';
import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react';




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
const EthProvider =
    new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/14701777a25c45b0ad74cf9bd1e8b03a');

async function checkBalanceEth(address: string) {
    let balance = await EthProvider.getBalance(address);
    return balance;
}

function Wallets() {
    const [connectedAddress, setConnectedAddress] = React.useState("");
    const [connectedBalance, setConnectedBalance] = React.useState("");
    const [wallets, setWallets] = React.useState<IWallet[]>([]);

    let [contactListOpen, setContactListOpen] = React.useState(false);
    let [createContactOpen, setCreateContactOpen] = React.useState(false);

    const showContactList = () => {
        setContactListOpen(true);
    }

    const closeContactList = () => {
        setContactListOpen(false);
    }

    const closeCreateContact = () => {
        console.log("closeAddContact");
        setCreateContactOpen(false);
    }

    const createContact = () => {
        console.log("create contact");
        setCreateContactOpen(true);
    }

    const doneCreatingContact = () =>{
        console.log("create contact done");
    }

    const connectNewWallet = async () => {
        console.log("connect new wallet");

        // let result = await connect({
        //     connector: new InjectedConnector(),
        // });
        // let balance = await checkBalanceEth(result.account);
        // let newWallet = {
        //     addressTrio: {
        //         walletAddress: result.account,
        //         ensAddress: "",
        //         lensAddress: "",
        //     },
        //     balance: 10.0,
        // } as IWallet;
        // setWallets([...wallets, newWallet]);
        // console.log(result);
        // await disconnect();
    }

    const navContent = (
        <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
            <h2>Wallets</h2>
            <FontAwesomeIcon icon={faAddressBook} size="lg" onClick={() => showContactList()}/>
        </div>
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
                    </div>
                </div>
            </div>
            <div>{connectedAddress}</div>
            <div>{connectedBalance}</div>
            {/* Crypto wallets */}
            <div>
                <div style={{display: "flex"}}>
                    <h3>Cryptos</h3>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button>Wallets</Button>
                        <Button>Cryptos</Button>
                    </ButtonGroup>
                    <DynamicContextProvider
                        settings={{
                        appLogoUrl:
                            'public/theWaleWalletLogo.jpeg',
                        appName: 'The Whale Wallet',
                        environmentId: '18fa6c3f-9025-4c9b-8f5b-02eff904aa72'
                        }}
                    >
                        <DynamicWidget/>
                    </DynamicContextProvider>
                </div>

            </div>
        </div>
        
    );

    return (
        <div>
            <BasicLayout navContent={navContent} bodyContent={bodyContent} />
            <FullPageDrawer
                anchor="left"
                close={closeContactList}
                removeChevron={false}
                crumbName="Wallets"
                navTitle="Contacts"
                navActionText="+"
                navActionClickHandler={createContact}
                bodyContent={(<ContactList contacts={hardcodedContacts}/>)}
                open={contactListOpen}
            />
            <FullPageDrawer
                anchor="bottom"
                close={closeCreateContact}
                removeChevron={true}
                crumbName="Cancel"
                navTitle="New Contact"
                navActionText="Done"
                navActionClickHandler={doneCreatingContact}
                bodyContent={<><AddContact/></>}
                open={createContactOpen}
            />
        </div>
    );
}

export default Wallets;

