import React, { Component } from 'react';
import TopNav from './TopNav';

const basicLayoutStyle={
    width: "100%",
    height: "100%",
    padding: "20px",
    backgroundColor: "white",
}

export default function basicLayout({ navContent, bodyContent } : { navContent: React.ReactNode, bodyContent: React.ReactNode }) {
    return (
        <div style={basicLayoutStyle}>
            <TopNav navContent={navContent} />
            { bodyContent }
        </div>
    );
}

