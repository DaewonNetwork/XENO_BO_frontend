import useFetchData from "@/(FSD)/shareds/fetch/useFetchData"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ALL_WAITINGBRAND_QUERY_KEY } from "./useGetAllBrandApproves";
import { useEffect, useState } from "react";

export const useApprovalBrand = () => {
    const fetchData = useFetchData();
    const queryClient = useQueryClient();
    const [isClient, setIsClient] = useState(false);

    // 클라이언트 사이드에서만 실행되도록 하는 useEffect
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsClient(true);
        }
    }, []);


    return useMutation({
        mutationFn: async (id: number) => {
            if (!isClient) return null; // 클라이언트 사이드가 아니면 실행하지 않음
            try {
                const response = await fetchData({
                    path: `/manager/brand/approve/${id}`,
                    method: 'POST',
                    isAuthRequired: true
                });
                return response;
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                throw new Error('알수 없는 오류가 발생했습니다.')
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ALL_WAITINGBRAND_QUERY_KEY });
        }
    })
}