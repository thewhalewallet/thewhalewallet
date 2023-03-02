import React, { Component, ReactComponentElement, useEffect } from 'react';
import BasicLayout from './BasicLayout';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Drawer from '@mui/material/Drawer';

const drawerStyle={
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
}


export default function FullPageDrawer({open, close, removeChevron = false, crumbName, navTitle, navActionButton, bodyContent } : 
    { open: boolean, close: () => void, removeChevron: boolean, crumbName: string, navTitle: string, navActionButton: React.ReactNode, bodyContent: React.ReactNode }) {
    
    let [viewportWidth, setViewportWidth] = React.useState(0);

    useEffect(() => {
        setViewportWidth(window.innerWidth);
    }, []);

    
    const navContent = (
        <div style={{display: "flex", alignItems: "center"}}>
            <div style={{display: "flex", alignItems: "center", flexBasis:"0%", flexGrow:1}} onClick={()=>close()}>
                {!removeChevron ? 
                    <FontAwesomeIcon icon={faChevronLeft} size="lg"/> :
                    <></>
                }
                <h3>{crumbName}</h3>
            </div>
            <h3>{navTitle}</h3>
            <div style={{flexBasis:"0%", flexGrow:1, textAlign: "right"}}>
                {navActionButton}
            </div>
        </div>
    );

    return (
        // <div style={{...drawerStyle, visibility: open ? "visible" : "hidden"}}>
        //     <BasicLayout navContent={navContent} bodyContent={bodyContent}/>
        // </div>
        <Drawer
            sx={{
            width: viewportWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: viewportWidth,
                boxSizing: 'border-box',
            },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <BasicLayout navContent={navContent} bodyContent={bodyContent}/>
        </Drawer>
    );
}

