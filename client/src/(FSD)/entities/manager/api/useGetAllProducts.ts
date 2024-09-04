import useFetchData from "@/(FSD)/shareds/fetch/useFetchData"
import { ProductInfo } from "@/(FSD)/shareds/types/manager/ProductInfo.type";
import { useQuery } from "@tanstack/react-query";

export const ALL_PRODUCTS_QUERY_KEY = ['all_products'] as const;

export const useGetAllProducts = () => {
    const fetchData = useFetchData();

    return useQuery<ProductInfo[]>({
        queryKey: ["all_products"],
        queryFn: () => fetchData({ path: "/manager/brand/products", isAuthRequired: true }),
    });
};