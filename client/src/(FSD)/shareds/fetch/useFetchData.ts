"use client";

import { useEffect, useState, useCallback } from "react";
import { FetchType } from "../types/FetchData.type";
import { apiPath } from "./APIpath";

const useFetchData = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        // 클라이언트 사이드에서만 실행됨
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("access_token");
            setAccessToken(token);
        }
    }, []);

    const fetchData = useCallback(async ({ path, method = "GET", contentType = "application/json", isAuthRequired = false, isNotAuthRequired = false, body }: FetchType) => {
        let response = null;

        if ((!isNotAuthRequired) || (isAuthRequired)) {
            response = await fetch(`${apiPath}/api${path}`, {
                method: method,
                headers: {
                    "Content-Type": contentType,
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify(body)
            });
        } else {
            response = await fetch(`${apiPath}${path}`, {
                method: method,
                headers: {
                    "Content-Type": contentType,
                },
                body: JSON.stringify(body)
            });
        }

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        const data = await response.json();

        return data;
    }, [accessToken]);

    return fetchData;
};

export default useFetchData;