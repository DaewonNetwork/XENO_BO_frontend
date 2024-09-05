import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import styles from '@/(FSD)/shareds/styles/UserList.module.scss';
import React from "react";
import ApproveBrandList from "@/(FSD)/entities/manager/ui/ApproveBrandList";

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