import useFetchData from "@/(FSD)/shareds/fetch/useFetchData"
import { UserCustomerInfo } from "@/(FSD)/shareds/types/manager/UserCustomerInfo.type";
import { useQuery } from "@tanstack/react-query";

export const ALL_BRAND_QUERY_KEY = ['all_brand'] as const;

export const useGetAllBrand = () => {
    const fetchData = useFetchData();

    return useQuery<BrandInfo[]>({
        queryKey: ALL_BRAND_QUERY_KEY,
        queryFn: () => fetchData({ path: "/manager/brand", isAuthRequired: true }),
        staleTime: 0, // 데이터를 항상 "오래된" 것으로 간주
        refetchInterval: 500, // 5초마다 백그라운드에서 새 데이터 확인
        refetchOnWindowFocus: true, // 윈도우가 포커스를 받을 때 새 데이터 확인
    });
};