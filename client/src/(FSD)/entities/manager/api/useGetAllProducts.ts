import useFetchData from "@/(FSD)/shareds/fetch/useFetchData"
import { ProductInfo } from "@/(FSD)/shareds/types/manager/ProductInfo.type";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const ALL_PRODUCTS_QUERY_KEY = ['all_products'] as const;

export const useGetAllProducts = () => {
    const fetchData = useFetchData();
    const [isClient, setIsClient] = useState(false);

    // 클라이언트 사이드에서만 실행되도록 하는 useEffect
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsClient(true);
        }
    }, []);

    return useQuery<ProductInfo[]>({
        queryKey: ["all_products"],
        queryFn: () => fetchData({ path: "/manager/brand/products", isAuthRequired: true }),
        enabled: isClient,
    });
};