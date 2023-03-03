import { Box, Button, Modal } from '@mui/material';
import React, { Component } from 'react';
import BasicLayout, { IBasicLayoutProps } from './BasicLayout';
import FullPageDrawer, { IFullPageDrawerProps } from './FullPageDrawer';
import SendFundsModal from './SendFundsModal';
import IContact from './types/Contact';

const contactBox = {
    border: "1px solid black",
    backgroundColor: "lightgray",
    borderRadius: "4px",
    width: "100%",
    padding: "4px",
} as any;

const contactBoxTitle = {
    width: "100%",
} as any;

const contactBoxContent = {
    width: "100%",
} as any;

function ContactBox({title, content}:{title: string, content: string}){
    return (
        <Box sx={contactBox}>
            <div style={contactBoxTitle}>{title}</div>
            <div style={contactBoxContent}>{content}</div>
        </Box>
    );
}


export default function Contact({close, contact}: {close: () => void, contact: IContact}) {
    let [editContactDrawerOpen, setEditContactDrawerOpen] = React.useState(false);
    let [sendFundsModalOpen, setSendFundsModalOpen] = React.useState(false);

    const openEditContactDrawer = () => {
        setEditContactDrawerOpen(true);
    }

    const closeEditContactDrawer = () => {
        setEditContactDrawerOpen(false);
    }

    const openSendFundModal = () => {
        setSendFundsModalOpen(true);
    }

    const closeSendFundsModal = () => {
        setSendFundsModalOpen(false);
    }
    
    const contactBasicLayoutProps = {
        topNavProps: {
            crumbName: "Contact",
            crumbNameClickHandler: close,
            navTitle: "",
            navActionElement: "Edit",
            navActionClickHandler: openEditContactDrawer
        },
        bodyContent: (
            <>
                <ContactBox title="Name" content="George" />
                <ContactBox title="Phone" content="394-124-2356" />
                <Button onClick={openSendFundModal}>Open Modal</Button>
                <SendFundsModal opened={sendFundsModalOpen} handleClose={closeSendFundsModal} />
            </>
        ),
    } as IBasicLayoutProps;

    const editContactDrawerProps = {
        anchor: "bottom",
        open: editContactDrawerOpen,
        pageContent: (<Button onClick={closeEditContactDrawer}>Close</Button>),
    } as IFullPageDrawerProps;

    return (
        <>
            <BasicLayout basicLayoutProps={contactBasicLayoutProps} />
            <FullPageDrawer fullPageDrawerProps={editContactDrawerProps} />
        </>
    );
}

