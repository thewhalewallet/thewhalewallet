import { UserContext } from '@/pages';
import { Box, FormControl, FormControlLabel, InputAdornment, InputLabel, List, MenuItem, Modal, Select, Switch, TextField, Typography } from '@mui/material';
import React, { Component } from 'react';
import BasicLayout from './BasicLayout';
import DetailedWallet from './DetailedWallet';
import IDetailedWallet from './types/IDetailedWallet';
import IWallet from './types/IWallet';
import IBasicLayoutProps from './types/props/IBasicLayoutProps';
import INavBarProps from './types/props/INavBarProps';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: "90%",
    width: "90%",
    bgcolor: 'white',
    boxShadow: 24,
};


export default function SendFundsModal({userDetailedWallets, open, handleClose }: {userDetailedWallets: IDetailedWallet[], open: boolean, handleClose: () => void}) {
    const [toAddress, setToAddress] = React.useState("");
    const [fromWallet, setFromWallet] = React.useState<IDetailedWallet | null>(null);
    const [amount, setAmount] = React.useState("");
    const [simulationAsked, setSimulationAsked] = React.useState(true);

    const sendFundsClicked = () => {
        console.log("Send Funds Clicked");
    }

    const userWalletClicked = (wallet: IDetailedWallet) => {
        setFromWallet(wallet);
    }


    const SendFundBody = (
        <>
            <TextField
                required
                label="To"
                variant="filled"
                fullWidth
                placeholder="Receiver address" 
                value={toAddress}
                onChange={(e) => {
                    setToAddress(e.target.value)
                }}
            />
            {
                userDetailedWallets.map((wallet: IDetailedWallet) => (
                    <Box key={wallet.address} 
                        onClick={() => userWalletClicked(wallet)}
                    >
                        <DetailedWallet detailedWallet={wallet} />
                    </Box>
                ))
            }
            <TextField
                required
                label="Amount"
                variant="filled"
                fullWidth
                placeholder="3.1415" 
                InputProps={{
                    endAdornment:
                        <InputAdornment position="end">
                            {`(max ${fromWallet != null ? 40 : 0})`}
                        </InputAdornment>
                    }
                }
                value={amount}
                onChange={(e) => {
                    setAmount(e.target.value)
                }}
            />
            <FormControlLabel
                value={simulationAsked}
                control={<Switch color="primary" />}
                label="Simulate"
                labelPlacement="end"
            />



        </>
    )

    const sendFundBasicLayoutProps = {
        navBarProps: {
            crumbName: "Cancel",
            crumbNameClickHandler: handleClose,
            navTitle: "Send Funds",
            navActionElement: "Send",
            navActionClickHandler: sendFundsClicked
        } as INavBarProps,
        bodyContent: (SendFundBody)
    } as IBasicLayoutProps;

    return (
        <Modal
            sx={style}
            open={open}
            onClose={handleClose}
        >
            <>
                <BasicLayout basicLayoutProps={sendFundBasicLayoutProps} />
            </>
        </Modal>
    );
}

