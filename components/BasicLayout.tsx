import { Box } from '@mui/material';
import React, { Component } from 'react';
import Navbar from './Navbar';
import styles from './BasicLayout.module.css';
import IBasicLayoutProps from './types/props/IBasicLayoutProps';


export default function basicLayout({ basicLayoutProps } : { basicLayoutProps: IBasicLayoutProps }) {
    return (
        <Box className={styles.basicLayoutStyle}>
            <Navbar navBarProps={basicLayoutProps.navBarProps} />
            <div className={styles.bodyStyle}>
                { basicLayoutProps.bodyContent }
            </div>
        </Box>
    );
}

