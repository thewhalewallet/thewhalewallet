import React, { Component } from 'react';
import BasicLayout from './BasicLayout';

const basicLayoutStyle={
    width: "100%",
    height: "100%",
    padding: "20px",
    backgroundColor: "white",
}

export default function FullPageDrawer({ basicLayoutComponent } : { basicLayoutComponent: React.ReactNode }) {
    return (
        <div style={basicLayoutStyle}>

        </div>
    );
}

