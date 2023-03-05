import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { Box } from '@mui/material';
import React from 'react';
import INavBarProps from './types/props/INavBarProps';


export default function Navbar({ navBarProps } : { navBarProps: INavBarProps }) {
    return (
        <Box sx={{width: "100%", height: "60px", display: "flex", alignItems: "center"}}>
            <div style={{display: "flex", alignItems: "center", flexBasis:"0%", flexGrow:1}} 
                onClick={navBarProps.crumbNameClickHandler}
            >
                <h4>{navBarProps.crumbName}</h4>
            </div>
            <h3>{navBarProps.navTitle}</h3>
            <div style={{flexBasis:"0%", flexGrow:1, textAlign: "right"}}
                onClick={navBarProps.navActionClickHandler}
            >
                {/* If navActionElement is a string, display the string, else display fontAwesomeIcon */}
                {typeof navBarProps.navActionElement === "string" ?
                    <h4>{navBarProps.navActionElement}</h4> :
                    <FontAwesomeIcon {...navBarProps.navActionElement} />
                }
            </div>
        </Box>
    );
}





