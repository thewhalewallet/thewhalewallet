import { Box } from "@mui/material";
import React from "react";
import styles from "./RoundedBox.module.css";
import SpinningWhale from "./SpinningWhale";
import IRoundedBoxProps from "./types/props/IRoundedBoxProps";



export function RoundedBox({ roundedBoxProps } : 
    { roundedBoxProps: IRoundedBoxProps }) {
    
    const [isLoading, setIsLoading] = React.useState(false);
    const isFirstRender = React.useRef(true);


    return (
        <Box sx={{
                bgcolor: roundedBoxProps.bgColor, 
                borderColor: roundedBoxProps.borderColor || "black",
                width: roundedBoxProps.width,
                position: "relative",
            }} 
            className={styles.roundedBox} 
            onClick={roundedBoxProps.onClickHandler}
        >
            {roundedBoxProps.children}
            <SpinningWhale isVisible={isLoading}/>
        </Box>
    );
}
