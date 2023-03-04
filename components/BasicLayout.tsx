import React, { Component } from 'react';
import Navbar from './Navbar';

const basicLayoutStyle={
    width: "100%",
    height: "100%",
    padding: "20px",
    backgroundColor: "white",
} as any;

const bodyStyle = {
    width: "100%",
    height: "100%",
} as any;

export interface IBasicLayoutProps {
    topNavProps: any,
    bodyContent: React.ReactNode
}

export default function basicLayout({ basicLayoutProps } : { basicLayoutProps: IBasicLayoutProps }) {
    return (
        <div style={basicLayoutStyle}>
            <Navbar />
            <div style={bodyStyle}>
                { basicLayoutProps.bodyContent }
            </div>
        </div>
    );
}

