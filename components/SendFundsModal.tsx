import { Box, FormControl, InputLabel, List, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import React, { Component } from 'react';
import BasicLayout from './BasicLayout';
import IDetailedWallet from './types/IDetailedWallet';
import IWallet from './types/IWallet';
import IBasicLayoutProps from './types/props/IBasicLayoutProps';
import INavBarProps from './types/props/INavBarProps';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: "50%",
    width: "90%",
    bgcolor: 'background.paper',
    boxShadow: 24,
};


export default function SendFundsModal({open, handleClose }: {open: boolean, handleClose: () => void}) {
    const [toAddress, setToAddress] = React.useState("");
    const [fromWallet, setFromWallet] = React.useState<IWallet | null>(null);

    const [userWallets, setUserWallets] = React.useState<IDetailedWallet[]>([]);

    const sendFundsClicked = () => {
        console.log("Send Funds Clicked");
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

