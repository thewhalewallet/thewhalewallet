import { Box } from '@mui/material';
import React from 'react';

import styles from './DetailedWallet.module.css';
import IDetailedWallet from './types/IDetailedWallet';

export default function DetailedWallet({ detailedWallet }: { detailedWallet: IDetailedWallet}) {
    return (
        <Box className={styles.wallet}>
            {/* nasdaqScreen for address */}
            <div className={styles.nasdaq}></div>
        </Box>
    );
}
