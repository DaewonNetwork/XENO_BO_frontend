import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import styles from '@/(FSD)/shareds/styles/UserList.module.scss';
import React from "react";
import ProductsList from "@/(FSD)/entities/manager/ui/ProductsList";

const Page = () => {
    return (
        <AppSection>
            <AppInner>
                <div className={styles.managerPage}>
                    <ProductsList />
                </div>
            </AppInner>
        </AppSection>
    );
};

export default Page;