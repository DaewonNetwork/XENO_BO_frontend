"use client";

import { apiPath } from "@/(FSD)/shareds/fetch/APIpath";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const tokenReadFetch = async (accessToken: string | null) => {
    if (!accessToken) {
        return null;
    }

    const response = await fetch(`${apiPath}/api/user/token`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        },
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
}

export const useTokenRead = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        setAccessToken(localStorage.getItem("access_token"));
    }, []);

    return useQuery({
        queryKey: ["token_read", accessToken],
        queryFn: () => tokenReadFetch(accessToken),
        enabled: !!accessToken, // accessToken이 있을 때만 쿼리 실행
    });
};