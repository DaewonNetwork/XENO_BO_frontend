import useFetchData from "@/(FSD)/shareds/fetch/useFetchData"
import { UserCustomerInfo } from "@/(FSD)/shareds/types/manager/UserCustomerInfo.type";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const ALL_USERS_QUERY_KEY = ['all_users'] as const;

export const useGetAllUsers = () => {
    const fetchData = useFetchData();
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // 클라이언트 사이드에서만 실행됨
            const token = localStorage.getItem("access_token");
            setAccessToken(token);
        }
    }, []);

    return useQuery<UserCustomerInfo[]>({
        queryKey: ["all_users"],
        queryFn: () => fetchData({ path: "/manager", isAuthRequired: true }),
    });
};