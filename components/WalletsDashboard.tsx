import React, { Component, useEffect } from 'react';
import BasicLayout from '@/components/BasicLayout';

import { faAddressBook } from '@fortawesome/free-solid-svg-icons'

import FullPageDrawer from '@/components/FullPageDrawer';

import ContactList from '@/components/ContactList';

import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

import { addWalletByEmail, getFollowingByWalletAddress } from '@/components/utils/wallet.service';

import { getEthAddressBalance } from '@/components/utils/covalent.service';
import ListOfDetailedWallets from '@/components/ListOfDetailedWallets';
import SendFundsModal from '@/components/SendFundsModal';
import DetailedWallet from '@/components/DetailedWallet';
import IContact from '@/components/types/IContact';
import IDetailedWallet from '@/components/types/IDetailedWallet';
import IDetailedCoinInfo from '@/components/types/IDetailedCoinInfo';
import IWrappedContact from '@/components/types/IWrappedContact';
import IWallet from '@/components/types/IWallet';
import IBasicLayoutProps from './types/props/IBasicLayoutProps';
import INavBarProps from './types/props/INavBarProps';
import IFullPageDrawerProps from './types/props/IFullPageDrawerProps';
import { UserContext } from '@/pages';
import IWrappedUser from './types/IDetailedUser';
import IUser from './types/IUser';
import { noUser } from './types/hardcoded/noUser';
import { Button } from '@mui/material';


export const SendFundModalContext = React.createContext(()=>{});

export default function WalletsDashboard() {
    const [user, setUser] = React.useState<IWrappedUser>(noUser);

    const [contactListOpen, setContactListOpen] = React.useState(false);
    const [sendFundModalOpen, setSendFundModalOpen] = React.useState(false);

    const userContext = React.useContext(UserContext);

    useEffect(() => {
        setup(userContext);
    }, [userContext]);

    const setup = async (user: IUser) => {
        let detailedWallets = await getDetailedWallets(user.wallets);
        let wrappedContactList = await getWrappedContactList(user);
        let wrappedUser = {
            ...user,
            detailedWallets: detailedWallets,
            wrappedContacts: wrappedContactList,
        } as IWrappedUser;
        setUser(wrappedUser);
    }

    const getDetailedWallets = (wallets: IWallet[]) => {
        let promises = wallets.map((wallet : IWallet) => {
            return getEthAddressBalance(wallet.address).then((data) => {
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
        return Promise.all(promises);
    }

    const getWrappedContactList = async (user: IUser) => {
        let databaseContacts = user.contacts;
        let lensContacts = await getFollowingContacts(user.wallets);

        let wrappedDatabaseContacts = getWrappedContacts(databaseContacts, false);
        let wrappedLensContacts = getWrappedContacts(lensContacts, true);

        // Filter lens contacts to remove those that are already in the database.
        let databaseAddresses = new Set(wrappedDatabaseContacts.map(
            (contact) => contact.address)
        );
        let lensContactsFiltered = wrappedLensContacts.filter(
            (contact) => !databaseAddresses.has(contact.address)
        );
        // Combine database and lens contacts.
        let contacts = wrappedDatabaseContacts.concat(lensContactsFiltered);

        // Sort contacts by name, ignoring case.
        return contacts.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
    }

    const getFollowingContacts = async (wallets: IWallet[]) => {
        // Get wallet that have lens accounts associated with them.
        let lensWallets = wallets.filter((wallet) => wallet.lens);
        // Create list of promises to get following list of each lens account.
        let promises = lensWallets.map((wallet) => getFollowingByWalletAddress(wallet.address));
        // Wait for all promises to resolve.
        let results = await Promise.all(promises);
        // Flatten the list of following lists into one list.
        let following = results.flatMap((result) => result.items);
        // Filter the following list to create IContact objects.
        let followingContacts = following.map((follow) => {
            return {
                _id: follow.profile.ownedBy,
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

    const getWrappedContacts = (contacts: IContact[], areFromLens: boolean) => {
        return contacts.map((contact) => {
            return {
                ...contact,
                isFromLens: areFromLens,
            } as IWrappedContact;
        });
    }

    const showContactList = async () => {
        setContactListOpen(true);
    }

    const closeContactList = () => {
        setContactListOpen(false);
    }

    const getTotalBalanceOfUser = () => {
        return user.detailedWallets.reduce((total, wallet) => {
            return total + wallet.detailedCoinInfos.reduce((total, coinInfo) => {
                return total + coinInfo.quote;
            }, 0);
        }, 0);
    }

    const openSendFundModal = () => {
        setSendFundModalOpen(true);
    }

    const closeSendFundModal = () => {
        setSendFundModalOpen(false);
    }

    const addWallet = async () => {
        let wallet = {
            name: "Wallet 1",
            address: "0x0dFFCe077ec519615C8Dd7Ee386e1dDAa596EB23",
            ens: "madhuran.eth",
            lens: "madhuran.lens",
            isFavorite: false,
        } as IWallet;
        addWalletByEmail({email_address: user.email, wallet: wallet});
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

    const navBarProps = {
        crumbName: "Wallets",
        crumbNameClickHandler: closeContactList,
        navTitle: "",
        navActionElement: {icon:faAddressBook, size:"lg"} as FontAwesomeIconProps,
        navActionClickHandler: showContactList,
    } as INavBarProps;

    const bodyContent = (
        <>
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
            {
                user.detailedWallets.map((wallet : IDetailedWallet) => {
                    return (
                        <DetailedWallet key={wallet.address} detailedWallet={wallet} />
                    )
                })
            }
            {/* <ListOfDetailedWallets detailedWallets={wallets}/> */}
            {/* {user.wallets.map((wallet) => {
                return (
                    <AddressTrio key={wallet.addressTrio.address} addressTrio={wallet.addressTrio} />
                )
            })} */}
            <Button onClick={openSendFundModal}>Send Funds</Button>
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
        </>
    );

    const walletsBasicLayoutProps = {
        navBarProps: navBarProps,
        bodyContent: bodyContent,
    } as IBasicLayoutProps;

    const contactListDrawerProps = {
        anchor: "left",
        open: contactListOpen,
        pageContent: (<ContactList close={closeContactList} wrappedContacts={user.wrappedContacts}/>),
    } as IFullPageDrawerProps;

    return (
        <SendFundModalContext.Provider value={openSendFundModal}>
            <BasicLayout basicLayoutProps={walletsBasicLayoutProps} />
            <FullPageDrawer
                fullPageDrawerProps={contactListDrawerProps}
            />
            <SendFundsModal open={sendFundModalOpen} handleClose={closeSendFundModal} />
        </SendFundModalContext.Provider>
    );
}


