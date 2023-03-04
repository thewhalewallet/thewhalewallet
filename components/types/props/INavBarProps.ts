import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

export default interface INavBarProps {
    crumbName: string,
    crumbNameClickHandler: () => void,
    navTitle: string,
    navActionElement: string | FontAwesomeIconProps,
    navActionClickHandler: () => void
}