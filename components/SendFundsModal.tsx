import { Box, Modal, Typography } from '@mui/material';
import React, { Component } from 'react';
import BasicLayout from './BasicLayout';

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


export default function SendFundsModal({opened, handleClose}: {opened: boolean, handleClose: () => void}) {
    return (
        <Modal
            open={opened}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {/* <BasicLayout
                    navContent={<></>}
                    bodyContent={<></>}
                /> */}

            </Box>
        </Modal>
    );
}

