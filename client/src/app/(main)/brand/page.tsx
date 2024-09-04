import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import UserList from "@/(FSD)/entities/manager/ui/UserList";
import styles from '@/(FSD)/shareds/styles/UserList.module.scss';
import React from "react";
import BrandList from "@/(FSD)/entities/manager/ui/BrandList";

const Page = () => {
    return (
        <AppSection>
            <AppInner>
                <div className={styles.managerPage}>
                    <BrandList />
                </div>
            </AppInner>
        </AppSection>
    );
};

export default Page;