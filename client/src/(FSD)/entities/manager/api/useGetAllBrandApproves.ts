import useFetchData from "@/(FSD)/shareds/fetch/useFetchData"
import { BrandApproveInfo } from "@/(FSD)/shareds/types/manager/BrandApproveInfo.type";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const ALL_WAITINGBRAND_QUERY_KEY = ['all_waitingBrand'] as const;

export const useGetAllBrandApproves = () => {
    const fetchData = useFetchData();
    const [isClient, setIsClient] = useState(false);

    // 클라이언트 사이드에서만 실행되도록 하는 useEffect
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsClient(true);
        }
    }, []);

    return useQuery<BrandApproveInfo[]>({
        queryKey: ['all_waitingBrand'],
        queryFn: () => fetchData({ path: "/manager/brand/approve", isAuthRequired: true }),
        enabled: isClient,
    });
};