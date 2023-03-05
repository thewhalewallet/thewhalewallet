import React from 'react';
import Drawer from '@mui/material/Drawer';
import IFullPageDrawerProps from './types/props/IFullPageDrawerProps';


export default function FullPageDrawer({ fullPageDrawerProps } : { fullPageDrawerProps: IFullPageDrawerProps}) {

    const getDrawerHeight = () => {
        if (fullPageDrawerProps.anchor == "bottom") {
            return "98%";
        } 
        else {
            return "100%";
        }
    }

    return (
        <Drawer
            sx={{
                height: getDrawerHeight(),
                width: "100%",
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    height: getDrawerHeight(),
                    width: "100%",
                    boxSizing: 'border-box',
                },
            }}
            anchor={fullPageDrawerProps.anchor}
            open={fullPageDrawerProps.open}
        >
            {fullPageDrawerProps.pageContent}
        </Drawer>
    );
}

