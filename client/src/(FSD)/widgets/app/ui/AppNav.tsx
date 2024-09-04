"use client";

import React, { useEffect, useState } from "react";
import AppInner from "./AppInner";
import AppContainer from "./AppContainer";
import styles from "@/(FSD)/shareds/styles/AppStyle.module.scss";
import LinkBtnShared from "@/(FSD)/shareds/ui/LinkBtnShared";
import TextXSmallShared from "@/(FSD)/shareds/ui/TextXSmallShared";
import IconShared from "@/(FSD)/shareds/ui/IconShared";

const AppNav = () => {




    const accessToken = localStorage.getItem("access_token");

    return (
        <nav className={`border-default-100 border-t-small ${styles.nav}`}>
            <AppContainer>
                <AppInner>
                    <div className={styles.inner}>
                        <LinkBtnShared href={"/brand/products"} data-hover={false} disableAnimation>
                            <IconShared iconType={"cart"} />
                            <TextXSmallShared>상품 리스트</TextXSmallShared>
                        </LinkBtnShared>
                        <LinkBtnShared href={"/"} data-hover={false} disableAnimation>
                            <IconShared iconType={"person"} />
                            <TextXSmallShared>유저 관리</TextXSmallShared>
                        </LinkBtnShared>
                        <LinkBtnShared href={"/brand"} data-hover={false} disableAnimation>
                            <IconShared iconType={"home"} />
                            <TextXSmallShared>판매사 관리</TextXSmallShared>
                        </LinkBtnShared>
                        <LinkBtnShared href={"/brand/approve"} data-hover={false} disableAnimation>
                            <IconShared iconType={"plus"} />
                            <TextXSmallShared>판매사 승인</TextXSmallShared>
                        </LinkBtnShared>
                    </div>
                </AppInner>
            </AppContainer>

        </nav >
    );
};

export default AppNav;