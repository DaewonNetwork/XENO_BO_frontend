"use client";

import useFetchData from "@/(FSD)/shareds/fetch/useFetchData"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ALL_PRODUCTS_QUERY_KEY } from "./useGetAllProducts";
import { useEffect, useState } from "react";

export const useDeleteProduct = () => {
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
        mutationFn: async (productId: number) => {
            if (!isClient) return null; // 클라이언트 사이드가 아니면 실행하지 않음
            try {
                const response = await fetchData({
                    path: `/manager/brand/products/${productId}`,
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
            queryClient.invalidateQueries({ queryKey: ALL_PRODUCTS_QUERY_KEY });
        },
    });
};