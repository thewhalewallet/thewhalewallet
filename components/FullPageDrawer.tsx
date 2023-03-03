import React, { Component, ReactComponentElement, ReactElement, ReactNode, useEffect } from 'react';
import BasicLayout from './BasicLayout';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Drawer, { DrawerProps } from '@mui/material/Drawer';

const drawerStyle={
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
}

export interface IFullPageDrawerProps {
    anchor: "left" | "bottom",
    open: boolean,
    pageContent: ReactElement<any>,
}


export default function FullPageDrawer({ fullPageDrawerProps } : { fullPageDrawerProps: IFullPageDrawerProps}) {
    return (
        <Drawer
            sx={{
                height: "98%",
                width: "100%",
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    height: "98%",
                    width: "100%",
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor={fullPageDrawerProps.anchor}
            open={fullPageDrawerProps.open}
        >
            {fullPageDrawerProps.pageContent}
        </Drawer>
    );
}

