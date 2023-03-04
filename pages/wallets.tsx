import React, { Component, useEffect } from 'react';
import BasicLayout, { IBasicLayoutProps } from '@/components/BasicLayout';

import { faAddressBook } from '@fortawesome/free-solid-svg-icons'

import FullPageDrawer, { IFullPageDrawerProps } from '@/components/FullPageDrawer';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ContactList from '@/components/ContactList';

import { ethers } from 'ethers';

import IWallet from '@/components/types/Wallet';
import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react';
import { ITopNavProps } from '@/components/TopNav';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import IContact from '@/components/types/Contact';

import { getContacts } from '@/components/utils/contact.service';
import { getFollowingByWalletAddress } from '@/components/utils/wallet.service';
import { Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import AddressTrio from '@/components/AddressTrio';

import { getEthAddressBalance } from '@/components/utils/covalent.service';
import { integer } from 'aws-sdk/clients/cloudfront';
import ListOfDetailedWallets from '@/components/ListOfDetailedWallets';

const EthProvider =
    new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/14701777a25c45b0ad74cf9bd1e8b03a');

async function checkBalanceEth(address: string) {
    let balance = await EthProvider.getBalance(address);
    return balance;
}

interface IUser{
    name: string;
    email: string;
    wallets: IWallet[];
    contacts: IContact[];
}

const hardcodedContacts: IContact[] = [
    {
        name: "Jonas",
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        ens: "jonas.eth",
        lens: "jonas.lens.eth",
        isFavorite: true,
    },
    {
        name: "Thomas",
        address: "0x5FbDB2315678afe31367f032d93F642f64180bb3",
        ens: "thomas.eth",
        lens: "thomas.lens.eth",
        isFavorite: false,
    },
    {
        name: "Jens",
        address: "0xa408DDD1BeA8f798449e79C0e8A25d8b301e526b",
        ens: "jens.eth",
        lens: "jens.lens.eth",
        isFavorite: false,
    },
];

const userWallets: IWallet[] = [
    {
        addressTrio: {
            address: "0x0dFFCe077ec519615C8Dd7Ee386e1dDAa596EB23",
            ens: "madhuran.eth",
            lens: "madhuran.lens",
        },
    },
    {
        addressTrio: {
            address: "0xCA30F395F269078149520df119e74eAd0e415c49",
            ens: "thomas.eth",
            lens: "thomas.lens",
        },
    },
];    

const user: IUser = {
    name: "Madhuran",
    email: "madhi@gmail.com",
    wallets: userWallets,
    contacts: hardcodedContacts,
};

export interface IDetailedCoinInfo {
    contractAddress: string;
    contractDecimal: number;
    tokenBalance: number;
    contractTickerSymbol: string;
    logoUrl: string;
    quote: number;
}

export interface IDetailedWallet extends IWallet {
    detailedCoinInfos: IDetailedCoinInfo[]
    quoteCurrency: string;
}

function Wallets() {
    const [connectedAddress, setConnectedAddress] = React.useState("");
    const [connectedBalance, setConnectedBalance] = React.useState("");
    const [contacts, setContacts] = React.useState<IContact[]>([]);
    const [wallets, setWallets] = React.useState<IDetailedWallet[]>([]);

    let [contactListOpen, setContactListOpen] = React.useState(false);
    let [createContactOpen, setCreateContactOpen] = React.useState(false);

    useEffect(() => {
        // Fetch the user
        //...
        let usersWallets = user.wallets;
        // Get the balance of each wallet and add the wallet to the list.
        let promises = usersWallets.map((wallet) => {
            return getEthAddressBalance(wallet.addressTrio.address).then((data) => {
                let walletCoinsInfo = data.data.items.map((item) => {
                    return {
                        contractAddress: item.contract_address,
                        contractDecimal: item.contract_decimals,
                        tokenBalance: item.balance,
                        contractTickerSymbol: item.contract_ticker_symbol,
                        logoUrl: item.logo_url,
                        quote: item.quote,
                    } as IDetailedCoinInfo;
                }) as IDetailedCoinInfo[];
                return {
                    ...wallet,
                    detailedCoinInfos: walletCoinsInfo,
                    quoteCurrency: data.data.quote_currency,
                } as IDetailedWallet;
            })
        });
        Promise.all(promises).then((results) => {
            setWallets(results);
        });
    }, []);

    const getFollowingContacts = async () => {
        // Get wallet that have lens accounts associated with them.
        let lensWallets = user.wallets.filter((wallet) => wallet.addressTrio.lens);
        // Create list of promises to get following list of each lens account.
        let promises = lensWallets.map((wallet) => getFollowingByWalletAddress(wallet.addressTrio.address));
        // Wait for all promises to resolve.
        let results = await Promise.all(promises);
        // Flatten the list of following lists into one list.
        let following = results.flatMap((result) => result.items);
        // Filter the following list to create IContact objects.
        let followingContacts = following.map((follow) => {
            return {
                name: follow.profile.handle,
                address: follow.profile.ownedBy,
                ens: "", // TODO: Get ENS from address.
                lens: follow.profile.handle,
                isFavorite: false,
                fromLens: true,
            } as IContact;
        });
        return followingContacts;
    }


    const showContactList = async () => {
        // getContacts({user: "jonaksdbsad"}).then((res) => {
        //     let contacts = res.data as IContact[];
        //     setContacts(contacts);
        //     setContactListOpen(true);
        // });
        let databaseContacts = user.contacts;
        let lensContacts = await getFollowingContacts();

        // Filter lens contacts to remove those that are already in the database.
        let databaseAddresses = new Set(databaseContacts.map((contact) => contact.address));
        let lensContactsFiltered = lensContacts
            .filter((contact) => !databaseAddresses.has(contact.address));

        // Combine database and lens contacts.
        let contacts = databaseContacts.concat(lensContactsFiltered);

        // Sort contacts by name, ignoring case.
        contacts.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

        setContacts(contacts);
        setContactListOpen(true);
    }

    const closeContactList = () => {
        setContactListOpen(false);
    }

    const getTotalBalanceOfUser = () => {
        return wallets.reduce((total, wallet) => {
            return total + wallet.detailedCoinInfos.reduce((total, coinInfo) => {
                return total + coinInfo.quote;
            }, 0);
        }, 0);
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

    const [cryptoDisplayOption, setCryptoDisplayOption] = React.useState("Wallets");
    const totalBalance = "0.00"; // TODO: Get all wallets and bank accounts and add them up

    const topNavProps = {
        crumbName: "Wallets",
        crumbNameClickHandler: closeContactList,
        navTitle: "",
        navActionElement: {icon:faAddressBook, size:"lg"} as FontAwesomeIconProps,
        navActionClickHandler: showContactList,
    } as ITopNavProps;

    const bodyContent = (
        <div>
            {/* Total balance */}
            <div style={{display:"flex", justifyContent:"center"}}>
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Total Balance</div>
                        <div className="stat-value">{`${getTotalBalanceOfUser().toFixed(2)} USD`}</div>
                    </div>
                </div>
            </div>
            {/* Crypto wallets */}
            <ListOfDetailedWallets detailedWallets={wallets}/>
            {/* {user.wallets.map((wallet) => {
                return (
                    <AddressTrio key={wallet.addressTrio.address} addressTrio={wallet.addressTrio} />
                )
            })} */}

            {/* <div>
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

            </div> */}
        </div>
    );

    const walletsBasicLayoutProps = {
        topNavProps: topNavProps,
        bodyContent: bodyContent,
    } as IBasicLayoutProps;

    const contactListDrawerProps = {
        anchor: "left",
        open: contactListOpen,
        pageContent: (<ContactList close={closeContactList} contacts={contacts}/>),
    } as IFullPageDrawerProps;

    return (
        <div>
            <BasicLayout basicLayoutProps={walletsBasicLayoutProps} />
            <FullPageDrawer
                fullPageDrawerProps={contactListDrawerProps}
            />
        </div>
    );
}

export default Wallets;

