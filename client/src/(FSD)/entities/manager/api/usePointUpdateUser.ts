"use client";

import { useEffect, useState } from 'react';
import { PointUpdate } from './../../../shareds/types/manager/PointUpdate.type';
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ALL_USERS_QUERY_KEY } from '@/(FSD)/entities/manager/api/useGetAllUsers';

export const usePointUpdateUser = () => {
    const fetchData = useFetchData();
    const queryClient = useQueryClient();
    const [isClient, setIsClient] = useState(false);

    // 클라이언트 사이드에서만 실행되도록 하는 useEffect
    useEffect(() => {
        setIsClient(true);
    }, []);

    const updatePoint = async ({ userId, newPoint }: PointUpdate) => {
        if (!isClient) return null; // 클라이언트 사이드가 아니면 실행하지 않음
        const response = await fetchData({
            path: `/manager/point/${userId}`,
            method: 'PUT',
            body: { PointChange: newPoint },
            isAuthRequired: true,
        });
        return response;
    };

    return {
        updatePoint: async (pointUpdate: PointUpdate) => {
            if (!isClient) return null; // 클라이언트 사이드가 아니면 실행하지 않음
            const result = await updatePoint(pointUpdate);
            queryClient.invalidateQueries({ queryKey: [ALL_USERS_QUERY_KEY] });
            return result;
        },
        usePointUpdateQuery: (pointUpdate: PointUpdate) => 
            useQuery({
                queryKey: ['point_update', pointUpdate.userId, pointUpdate.newPoint],
                queryFn: () => updatePoint(pointUpdate),
                enabled: isClient,  // 클라이언트 사이드에서만 쿼리가 실행되도록 설정
            }),
    };
};