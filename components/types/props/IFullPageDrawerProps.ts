import { ReactElement } from "react";

export default interface IFullPageDrawerProps {
    anchor: "left" | "bottom",
    open: boolean,
    pageContent: ReactElement<any>,
}