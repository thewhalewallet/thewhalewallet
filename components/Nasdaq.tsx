import React from 'react';
import styles from './Nasdaq.module.css';

export default function Nasdaq({ sep, stringList }: { sep: string, stringList: string[] }) {
    const [textCopy, setTextCopy] = React.useState("text");

    React.useEffect(() => {
        // Remove all empty strings from stringList
        const filteredStringList = stringList.filter((string) => string !== "");
        // Join all strings in stringList with sep
        const joinedString = filteredStringList.join(sep) + sep;
        // Set textCopy to joinedString
        setTextCopy(joinedString);
    }, []);


    // Every 100ms, put the last character of textCopy into the front of textCopy
    React.useEffect(() => {
        const interval = setInterval(() => {
            setTextCopy(textCopy.slice(1) + textCopy.slice(0, 1));
        }, 200);
        return () => clearInterval(interval);
    }, [textCopy]);

    return (
        <div className={styles.nasdaq}>
            {textCopy}
        </div>
    );
}
