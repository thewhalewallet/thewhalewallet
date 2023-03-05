import React, { Component, useEffect } from 'react';
import BasicLayout from '@/components/BasicLayout';

import { faAddressBook } from '@fortawesome/free-solid-svg-icons'

import FullPageDrawer from '@/components/FullPageDrawer';

import ContactList from '@/components/ContactList';

import { DynamicConnectButton, DynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

import { addWalletByEmail, getFollowingByWalletAddress } from '@/components/utils/wallet.service';

import { getEthAddressBalance } from '@/components/utils/covalent.service';
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
import PlaidDisplay from './plaid/PlaidDisplay';
import { RoundedBox } from './RoundedBox';
import IRoundedBoxProps from './types/props/IRoundedBoxProps';
import { PlaidChart } from './plaid/PlaidChart';
import { Box } from '@mui/system';

export const SendFundModalContext = React.createContext(()=>{});

export default function WalletsDashboard() {
    const { user, handleLogOut, setShowAuthFlow, showAuthFlow, walletConnector } = useDynamicContext();

    const [contactListOpen, setContactListOpen] = React.useState(false);
    const [sendFundModalOpen, setSendFundModalOpen] = React.useState(false);
    const [detailedUser, setDetailedUser] = React.useState<IWrappedUser>(noUser);

    const { loggedUser } = React.useContext(UserContext);

    useEffect(() => {
        console.log(user);
    }, [user, walletConnector]);

    useEffect(() => {
        setup(loggedUser);
    }, [loggedUser]);

    const setup = async (user: IUser) => {
        let detailedWallets = await getDetailedWallets(user.wallets);
        let wrappedContactList = await getWrappedContactList(user);
        let wrappedUser = {
            ...user,
            detailedWallets: detailedWallets,
            wrappedContacts: wrappedContactList,
        } as IWrappedUser;
        setDetailedUser(wrappedUser);
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
        return detailedUser.detailedWallets.reduce((total, wallet) => {
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

    const navBarProps = {
        crumbName: "Wallets",
        crumbNameClickHandler: closeContactList,
        navTitle: "",
        navActionElement: {icon:faAddressBook, size:"lg"} as FontAwesomeIconProps,
        navActionClickHandler: showContactList,
    } as INavBarProps;

    const bodyContent = (
        <div>
            <div className=''>
                <DynamicWidget variant='modal'/>
            </div>

            {/* Total balance */}
            <RoundedBox roundedBoxProps={{
                bgColor: "light-green",
                width: "100%",

                children: (
                    <div>
                        <div style={{display:"flex", justifyContent:"center"}}>
                            <div>
                                <div className="stat-title">Total Balance</div>
                                <div className="stat-value">{`${getTotalBalanceOfUser().toFixed(2)} USD`}</div>
                            </div>
                        </div>
                        <div>
                            <PlaidChart user={loggedUser}/>
                        </div>
                    </div>
                )} as IRoundedBoxProps} 
            />

            {/* Crypto wallets */}
            {
                detailedUser.detailedWallets.map((wallet : IDetailedWallet) => {
                    return (
                        <DetailedWallet key={wallet.address} detailedWallet={wallet} />
                    )
                })
            }
            <Box display={"flex"}>
                <button className="whaleButton"
                    style={{flex:1}}
                    onClick={() => setShowAuthFlow(true)}
                >
                    Add New Wallets
                </button>
                <div style={{flex:1}}>
                    <PlaidDisplay user={loggedUser}/>
                </div>
            </Box>

            <Button onClick={openSendFundModal}>Send Funds</Button>

        </div>
    );

    const walletsBasicLayoutProps = {
        navBarProps: navBarProps,
        bodyContent: bodyContent,
    } as IBasicLayoutProps;

    const contactListDrawerProps = {
        anchor: "left",
        open: contactListOpen,
        pageContent: (<ContactList close={closeContactList} wrappedContacts={detailedUser.wrappedContacts}/>),
    } as IFullPageDrawerProps;

    return (
        <div className="takespace">
            <SendFundModalContext.Provider value={openSendFundModal}>
                <BasicLayout basicLayoutProps={walletsBasicLayoutProps} />
                <FullPageDrawer
                    fullPageDrawerProps={contactListDrawerProps}
                />
                <SendFundsModal userDetailedWallets={detailedUser.detailedWallets} open={sendFundModalOpen} handleClose={closeSendFundModal} />
            </SendFundModalContext.Provider>
        </div>
    );
}


