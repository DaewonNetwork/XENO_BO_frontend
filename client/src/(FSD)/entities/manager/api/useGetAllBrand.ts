import useFetchData from "@/(FSD)/shareds/fetch/useFetchData"
import { UserCustomerInfo } from "@/(FSD)/shareds/types/manager/UserCustomerInfo.type";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const ALL_BRAND_QUERY_KEY = ['all_brand'] as const;

export const useGetAllBrand = () => {
    const fetchData = useFetchData();
    const [isClient, setIsClient] = useState(false);

    // 클라이언트 사이드에서만 실행되도록 하는 useEffect
    useEffect(() => {
        setIsClient(true);
    }, []);

    return useQuery<BrandInfo[]>({
        queryKey: ALL_BRAND_QUERY_KEY,
        queryFn: () => fetchData({ path: "/manager/brand", isAuthRequired: true }),
        enabled: isClient,
    });
};