import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ALL_USERS_QUERY_KEY } from '@/(FSD)/entities/manager/api/useGetAllUsers';
import useFetchData from '@/(FSD)/shareds/fetch/useFetchData';

interface LevelUpdate {
    userId: number;
    newLevel: string;
}

export const useLevelUpdateUser = () => {
    const fetchData = useFetchData();
    const queryClient = useQueryClient();

    const updateLevel = async ({ userId, newLevel }: LevelUpdate): Promise<void> => {
        const response = await fetchData({
            path: `/manager/level/${userId}`,
            method: 'PUT',
            body: { newLevel },
            isAuthRequired: true,
        });

        // response가 이미 파싱된 데이터라고 가정
        if (response.error) {
            throw new Error(response.error || '등급 업데이트 중 오류가 발생했습니다.');
        }

        // 성공 시 아무것도 반환하지 않음
    };

    return {
        updateLevel: async (levelUpdate: LevelUpdate) => {
            await updateLevel(levelUpdate);
            queryClient.invalidateQueries({ queryKey: [ALL_USERS_QUERY_KEY] });
        },
        useLevelUpdateQuery: (levelUpdate: LevelUpdate) => 
            useQuery<void, Error>({
                queryKey: ['level_update', levelUpdate.userId, levelUpdate.newLevel],
                queryFn: () => updateLevel(levelUpdate),
                enabled: false,
            }),
    };
};