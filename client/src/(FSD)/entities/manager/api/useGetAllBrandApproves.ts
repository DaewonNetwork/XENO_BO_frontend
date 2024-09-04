import useFetchData from "@/(FSD)/shareds/fetch/useFetchData"
import { BrandApproveInfo } from "@/(FSD)/shareds/types/manager/BrandApproveInfo.type";
import { useQuery } from "@tanstack/react-query";

export const ALL_WAITINGBRAND_QUERY_KEY = ['all_waitingBrand'] as const;

export const useGetAllBrandApproves = () => {
    const fetchData = useFetchData();

    return useQuery<BrandApproveInfo[]>({
        queryKey: ['all_waitingBrand'],
        queryFn: () => fetchData({ path: "/manager/brand/approve", isAuthRequired: true }),
    });
};