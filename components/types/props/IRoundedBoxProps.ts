export default interface IRoundedBoxProps {
    bgColor?: string;
    borderColor?: string;
    width?: string;
    children?: React.ReactNode;
    onClickHandler?: (() => void);
    loadingBackdrop?: boolean;
}