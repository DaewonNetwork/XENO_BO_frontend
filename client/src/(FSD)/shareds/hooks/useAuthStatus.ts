"use client";

import { useEffect, useState } from "react";
import { isLoggedInState } from "../stores/UserAtom";
import { useSetRecoilState } from "recoil";
import { useTokenRead } from "@/(FSD)/entities/auth/api/useTokenRead";

const useAuthStatus = () => {
    const { data, isError, isPending, error, refetch } = useTokenRead();

    const set = useSetRecoilState(isLoggedInState);

    const [accessToken, setAccessToken] = useState<string | null>(null);
    const isLoggedIn: boolean = !!data;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("access_token");
            setAccessToken(token);
            set(isLoggedIn);
        }
    }, [data, isLoggedIn, set]);

    // useEffect(() => {
    //     if (isError) {
    //         if (typeof window !== 'undefined') {
    //             localStorage.removeItem("access_token");
    //             localStorage.removeItem("refresh_token");
    //         }
    //     }
    // }, [isError]);

    useEffect(() => {
        if (typeof window !== 'undefined' && accessToken) {
            refetch();
        }
    }, [accessToken, refetch]);

    return { data, isPending };
};

export default useAuthStatus;