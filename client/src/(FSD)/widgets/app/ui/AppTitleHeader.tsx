import React from "react";
import styles from "@/(FSD)/shareds/styles/AppStyle.module.scss";
import AppContainer from "./AppContainer";
import AppInner from "./AppInner";
import TextXLargeShared from "@/(FSD)/shareds/ui/TextXlargeShared";
import BackBtnShared from "@/(FSD)/shareds/ui/BackBtnShared";

interface AppTitleHeaderType {
    title: string;
    href?: string;
    left?: React.ReactNode;
    right?: React.ReactNode;
}

const AppTitleHeader = ({ title, left = <BackBtnShared />, right = <div></div> }: AppTitleHeaderType) => {
    return (
        <header className={`border-default-100 border-b-small ${styles.title_header}`}>
            <AppContainer>
                <AppInner>
                    <div className={styles.inner}>
                        {left}
                        <TextXLargeShared>{title}</TextXLargeShared>
                        {right}
                    </div>
                </AppInner>
            </AppContainer>
        </header>
    );
};

export default AppTitleHeader;