"use client";

import { ALL_BRAND_QUERY_KEY } from './useGetAllBrand';
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteBrand = () => {
    const fetchData = useFetchData();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (brandId: number) => {
            try {
                const response = await fetchData({ 
                    path: `/manager/brand/${brandId}`, 
                    method: 'DELETE', 
                    isAuthRequired: true 
                });
                return response;
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                throw new Error('알 수 없는 오류가 발생했습니다.');
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ALL_BRAND_QUERY_KEY });
        },
    });
};