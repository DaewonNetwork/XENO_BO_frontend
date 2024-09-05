import { PointUpdate } from './../../../shareds/types/manager/PointUpdate.type';
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ALL_USERS_QUERY_KEY } from '@/(FSD)/entities/manager/api/useGetAllUsers';
import { useEffect, useState } from 'react';

export const usePointUpdateUser = () => {
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
  
    const updatePoint = async ({ userId, newPoint }: PointUpdate) => {
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
        const result = await updatePoint(pointUpdate);
        queryClient.invalidateQueries({ queryKey: [ALL_USERS_QUERY_KEY] });
        return result;
      },
      usePointUpdateQuery: (pointUpdate: PointUpdate) => 
        useQuery({
          queryKey: ['point_update', pointUpdate.userId, pointUpdate.newPoint],
          queryFn: () => updatePoint(pointUpdate),
          enabled: false,  // 쿼리가 자동으로 실행되지 않도록 설정
        }),
    };
  };