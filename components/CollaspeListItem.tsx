import { IDetailedWallet } from '@/pages/wallets';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';

export default function CollaspeListItem({ detailedWallet }: { detailedWallet: IDetailedWallet }) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    // contractAddress: string;
    // contractDecimal: number;
    // tokenBalance: string;
    // contractTickerSymbol: string;
    // logoUrl: string;
    // quote: number;
    // quoteCurrency: string;

    const getWalletTotalBalance = () => {
        let walletTotalQuote = 0;
        detailedWallet.detailedCoinInfos.forEach((detailedCoinInfo) => {
            walletTotalQuote += detailedCoinInfo.quote;
        })
        return walletTotalQuote;
    }

    const convertCoinWithDecimal = (coin: number, decimal: number) => {
        console.log(coin, decimal, coin/(10^decimal));
        return (coin/(10**decimal));
    }


    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemText secondary={"wallet"} />
                <ListItemText secondary={`Bal= ${getWalletTotalBalance().toFixed(2)} ${detailedWallet.quoteCurrency}`} />
                {open ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        detailedWallet.detailedCoinInfos.map((detailedCoinInfo) => {
                            return (
                                <ListItem key={detailedCoinInfo.contractAddress} sx={{ pl: 2 }}>
                                    <ListItemText secondary={detailedCoinInfo.contractTickerSymbol} />
                                    <ListItemText 
                                        secondary={`Bal= 
                                            ${convertCoinWithDecimal(detailedCoinInfo.tokenBalance, detailedCoinInfo.contractDecimal).toFixed(4)} 
                                            ${detailedCoinInfo.contractTickerSymbol}`} 
                                        />
                                    <ListItemText secondary={`Quote= ${(detailedCoinInfo.quote).toFixed(2)} ${detailedWallet.quoteCurrency}`} />
                                </ListItem>
                            )
                        })
                    }

                    {/* <ListItem>

                    </ListItem>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Starred" />
                    </ListItemButton> */}
                </List>
            </Collapse>
        </>
    );
}
