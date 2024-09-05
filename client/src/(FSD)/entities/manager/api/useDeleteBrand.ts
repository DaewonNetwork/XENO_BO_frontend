"use client";

import { ALL_BRAND_QUERY_KEY } from './useGetAllBrand';
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from 'react';

export const useDeleteBrand = () => {
    const fetchData = useFetchData();
    const queryClient = useQueryClient();
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // 클라이언트 사이드에서만 실행됨
            const token = localStorage.getItem("access_token");
            setAccessToken(token);
        }
    }, []);

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