import useFetchData from "@/(FSD)/shareds/fetch/useFetchData"
import { UserCustomerInfo } from "@/(FSD)/shareds/types/manager/UserCustomerInfo.type";
import { useQuery } from "@tanstack/react-query";

export const ALL_BRAND_QUERY_KEY = ['all_brand'] as const;

export const useGetAllBrand = () => {
    const fetchData = useFetchData();

    return useQuery<BrandInfo[]>({
        queryKey: ALL_BRAND_QUERY_KEY,
        queryFn: () => fetchData({ path: "/manager/brand", isAuthRequired: true }),
    });
};