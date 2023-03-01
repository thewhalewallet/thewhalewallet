import React, { Component } from 'react';

const topNavStyle={
    width: "100%",
    height: "60px",
}

export default function TopNav({ navContent } : { navContent: React.ReactNode }) {
    return (
        <div style={topNavStyle}>
            { navContent }
        </div>
    );
}

