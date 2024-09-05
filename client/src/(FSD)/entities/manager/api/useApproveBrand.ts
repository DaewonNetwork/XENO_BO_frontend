import useFetchData from "@/(FSD)/shareds/fetch/useFetchData"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ALL_WAITINGBRAND_QUERY_KEY } from "./useGetAllBrandApproves";

export const useApprovalBrand = () => {
    const fetchData = useFetchData();
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: async (id: number) => {
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