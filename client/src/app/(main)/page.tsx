"use client"

import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import UserList from "@/(FSD)/entities/manager/ui/UserList";
import styles from '@/(FSD)/shareds/styles/UserList.module.scss';
import React from "react";
import AuthSigninForm from "@/(FSD)/features/auth/ui/AuthSigninForm";

const Page = () => {
    return (
        <AppSection>
            <AppInner>
                <AuthSigninForm />
            </AppInner>
        </AppSection>
    );
};

export default Page;