import React from 'react';

export default function SpinningWhale({isVisible}: {isVisible: boolean}) {

    return (
        <div style={{
            display: isVisible ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "#00bfff"
        }}>
            <img src="logo_transparent.png" 
                style={{
                    width: "80px",
                    height: "80px",
                    animation: "spin 2s linear infinite"
                }}
            />
        </div>
    );
}
