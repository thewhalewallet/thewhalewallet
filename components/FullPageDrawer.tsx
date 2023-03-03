import React, { Component, ReactComponentElement, useEffect } from 'react';
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


export default function FullPageDrawer({anchor, open, close, removeChevron = false, crumbName, navTitle, navActionText, navActionClickHandler, bodyContent } : 
    { anchor: any, open: boolean, close: () => void, removeChevron: boolean, crumbName: string, navTitle: string, navActionText: string, navActionClickHandler: () => void, bodyContent: React.ReactNode }) {

    const navContent = (
        <div style={{display: "flex", alignItems: "center"}}>
            <div style={{display: "flex", alignItems: "center", flexBasis:"0%", flexGrow:1}} onClick={()=>close()}>
                {!removeChevron ? 
                    <FontAwesomeIcon icon={faChevronLeft} size="lg"/> :
                    <></>
                }
                <h4>{crumbName}</h4>
            </div>
            <h3>{navTitle}</h3>
            <h4 style={{flexBasis:"0%", flexGrow:1, textAlign: "right"}}
                onClick={()=>navActionClickHandler()}
            >
                {navActionText}
            </h4>
        </div>
    );

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
            anchor={anchor}
            open={open}
        >
            <BasicLayout navContent={navContent} bodyContent={bodyContent}/>
        </Drawer>
    );
}

