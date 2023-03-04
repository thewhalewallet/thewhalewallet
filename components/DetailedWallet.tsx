import { Box } from '@mui/material';
import React from 'react';

import styles from './DetailedWallet.module.css';
import IDetailedWallet from './types/IDetailedWallet';

export default function DetailedWallet({ detailedWallet }: { detailedWallet: IDetailedWallet}) {

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


    return (
        <Box className={styles.wallet}>
            {/* nasdaqScreen for address */}
            <div className={styles.nasdaq}>
                {`${detailedWallet.address} ** ${detailedWallet.ens} ** ${detailedWallet.lens}`}
            </div>
            <div className={styles.aggregate}>
                <div>{detailedWallet.name}</div>
                <div>{`Balance = ${getWalletTotalBalance().toFixed(2)} USD`}</div>
            </div>
        </Box>
    );
}
