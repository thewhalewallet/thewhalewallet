import { Avatar, AvatarGroup, Badge, Box } from '@mui/material';
import React from 'react';

import styles from './DetailedWallet.module.css';
import Nasdaq from './Nasdaq';
import { RoundedBox } from './RoundedBox';
import IDetailedCoinInfo from './types/IDetailedCoinInfo';
import IDetailedWallet from './types/IDetailedWallet';
import IRoundedBoxProps from './types/props/IRoundedBoxProps';



export default function DetailedWallet({ detailedWallet }: { detailedWallet: IDetailedWallet}) {
    const [showDetails, setShowDetails] = React.useState(false);

    const getWalletTotalBalance = () => {
        let walletTotalQuote = 0;
        detailedWallet.detailedCoinInfos.forEach((detailedCoinInfo) => {
            walletTotalQuote += detailedCoinInfo.quote;
        })
        return walletTotalQuote;
    }

    const convertCoinWithDecimal = (coin: number, decimal: number) => {
        return (coin/(10**decimal));
    }

    const walletClicked = () => {
        setShowDetails(!showDetails);
    }

    const coinClicked = (detailedCoinInfo: IDetailedCoinInfo) => {
        console.log(`coinClicked: ${detailedCoinInfo.contractTickerSymbol}`);
    }

    const walletBoxProps: IRoundedBoxProps = {
        bgColor: "orange",
        borderColor: "black",
        children: (
            <>
                <Nasdaq sep={"  **  "} stringList={[detailedWallet.address, detailedWallet.ens, detailedWallet.lens]} />
                <div className={styles.aggregate}>
                    <AvatarGroup max={4}>
                        {
                            detailedWallet.detailedCoinInfos.map((detailedCoinInfo) => {
                                return (
                                    <Avatar key={detailedCoinInfo.contractAddress}
                                        alt={detailedCoinInfo.contractTickerSymbol + "logo"}
                                        src={detailedCoinInfo.logoUrl}
                                    />
                                )
                            })
                        }
                    </AvatarGroup>
                    <div className="stat-value">{`${getWalletTotalBalance().toFixed(2)} ${detailedWallet.quoteCurrency}`}</div>
                </div>
            </>
        ),
        onClickHandler: walletClicked,
        loadingBackdrop: true,
    }

    return (
        <>
            <RoundedBox roundedBoxProps={walletBoxProps} />
            {
                showDetails ? 
                detailedWallet.detailedCoinInfos.map((detailedCoinInfo) => {
                    const coinBoxProps: IRoundedBoxProps = {
                        bgColor: "lightblue",
                        borderColor: "black",
                        width: "90%",
                        children: (
                            <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                            }}
                            >
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    badgeContent={
                                        <div style={{
                                            padding: "4px",
                                            backgroundColor: "white",
                                            borderRadius: "10px",
                                            marginLeft: "16px"
                                        }}
                                        >{detailedCoinInfo.contractTickerSymbol}</div>
                                    }
                                    >
                                    <Avatar src={detailedCoinInfo.logoUrl} />
                                </Badge>
                                <Box>
                                    <div>
                                        {`${detailedCoinInfo.quote.toFixed(2)} USD`}
                                    </div>
                                    <div>
                                        {`
                                        ${convertCoinWithDecimal(detailedCoinInfo.tokenBalance, detailedCoinInfo.contractDecimal).toFixed(2)} 
                                        ${detailedCoinInfo.contractTickerSymbol}
                                        `}
                                    </div>
                                </Box>
                            </Box>
                        )
                    }
                    return (
                        <RoundedBox key={detailedCoinInfo.contractAddress} 
                            roundedBoxProps={{
                                ...coinBoxProps,
                                onClickHandler: () => coinClicked(detailedCoinInfo),
                                loadingBackdrop: true,
                            }}
                        />
                    )
                })
                : <></>
            }
        </>
    );
}
