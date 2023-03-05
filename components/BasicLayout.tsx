import { Box } from '@mui/material';
import React, { Component } from 'react';
import Navbar from './Navbar';
import styles from './BasicLayout.module.css';
import IBasicLayoutProps from './types/props/IBasicLayoutProps';


export default function BasicLayout({ basicLayoutProps } : { basicLayoutProps: IBasicLayoutProps }) {
    return (
        <Box className="takespace" style={{padding: "8px 14px"}}>
            <Navbar navBarProps={basicLayoutProps.navBarProps} />
            <Box className={styles.bodyStyle}>
                { basicLayoutProps.bodyContent }
            </Box>
        </Box>
    );
}

