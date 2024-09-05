import useFetchData from "@/(FSD)/shareds/fetch/useFetchData"
import { UserCustomerInfo } from "@/(FSD)/shareds/types/manager/UserCustomerInfo.type";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const ALL_USERS_QUERY_KEY = ['all_users'] as const;

export const useGetAllUsers = () => {
    const fetchData = useFetchData();
    const [isClient, setIsClient] = useState(false);

    // 클라이언트 사이드에서만 실행되도록 하는 useEffect
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsClient(true);
        }
    }, []);

    return useQuery<UserCustomerInfo[]>({
        queryKey: ["all_users"],
        queryFn: () => fetchData({ path: "/manager", isAuthRequired: true }),
        enabled: isClient,
    });
};