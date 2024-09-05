import { ALL_USERS_QUERY_KEY } from '@/(FSD)/entities/manager/api/useGetAllUsers';
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from 'react';

export const useDeleteUser = () => {
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
        mutationFn: async (userId: number) => {
            if (!isClient) return null; // 클라이언트 사이드가 아니면 실행하지 않음
            try {
                const response = await fetchData({ 
                    path: `/manager/${userId}`, 
                    method: 'DELETE', 
                    isAuthRequired: true 
                });
                return response;
            } catch (error) {
                // 에러 객체에서 메시지를 추출합니다.
                if (error instanceof Error) {
                    return error.message;
                }
                return '알 수 없는 오류가 발생했습니다.';
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ALL_USERS_QUERY_KEY });
        },
    });
};