"use client";

import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import styles from '@/(FSD)/shareds/styles/UserList.module.scss';
import React from "react";
import dynamic from "next/dynamic";

// ApproveBrandList를 동적으로 임포트
const ApproveBrandList = dynamic(
    () => import("@/(FSD)/entities/manager/ui/ApproveBrandList"),
    { ssr: false }
  );

const Page = () => {
    return (
        <AppSection>
            <AppInner>
                <div className={styles.managerPage}>
                    <ApproveBrandList />
                </div>
            </AppInner>
        </AppSection>
    );
};

export default Page;