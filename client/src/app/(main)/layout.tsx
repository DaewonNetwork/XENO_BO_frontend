import AppFixedBtmBar from "@/(FSD)/widgets/app/ui/AppFixedBtmBar";
import AppFixedTopBar from "@/(FSD)/widgets/app/ui/AppFixedTopBar";
import AppHeader from "@/(FSD)/widgets/app/ui/AppHeader";
import AppNav from "@/(FSD)/widgets/app/ui/AppNav";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "XENO | manager",
}

const Layout = ({ children, }: { children: React.ReactNode }) => {
    return (
        <>
            <AppFixedTopBar>
                <AppHeader />
            </AppFixedTopBar>
            {children}
            <AppFixedBtmBar>
                <AppNav />
            </AppFixedBtmBar>
        </>
    );
};

export default Layout;