import React from "react";
import styles from "@/(FSD)/shareds/styles/AppStyle.module.scss";
import LogoShared from "@/(FSD)/shareds/ui/LogoShared";
import { Button } from "@nextui-org/button";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import LinkBtnShared from "@/(FSD)/shareds/ui/LinkBtnShared";
import AppInner from "./AppInner";
import AppContainer from "./AppContainer";

const AppHeader = () => {
    return (
        <header className={`border-default-100 border-b-small ${styles.header}`}>
            <AppContainer>
                <AppInner>
                    <div className={styles.inner}>
                        <div></div>
                        <div className={styles.header_logo}>
                            <LogoShared />
                        </div>
                        <div></div>
                    </div>
                </AppInner>
            </AppContainer>
        </header>
    );
};

export default AppHeader;