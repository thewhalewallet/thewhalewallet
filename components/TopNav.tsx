import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';

const topNavStyle={
    width: "100%",
    height: "60px",
}

// interface for the props
export interface ITopNavProps {
    crumbName: string,
    crumbNameClickHandler: () => void,
    navTitle: string,
    navActionElement: string | FontAwesomeIconProps,
    navActionClickHandler: () => void
}

export default function TopNav({ topNavProps } : { topNavProps: ITopNavProps }) {
    return (
        <div style={{...topNavStyle,display: "flex", alignItems: "center"}}>
            <div style={{display: "flex", alignItems: "center", flexBasis:"0%", flexGrow:1}} onClick={topNavProps.crumbNameClickHandler}>
                <h4>{topNavProps.crumbName}</h4>
            </div>
            <h3>{topNavProps.navTitle}</h3>
            <div style={{flexBasis:"0%", flexGrow:1, textAlign: "right"}}
                onClick={topNavProps.navActionClickHandler}
            >
                {/* If navActionElement is a string, display the string, else display fontAwesomeIcon */}
                {typeof topNavProps.navActionElement === "string" ?
                    <h4>{topNavProps.navActionElement}</h4> :
                    <FontAwesomeIcon {...topNavProps.navActionElement} />
                }
            </div>
        </div>
    );
}

