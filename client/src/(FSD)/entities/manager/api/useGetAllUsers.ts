import useFetchData from "@/(FSD)/shareds/fetch/useFetchData"
import { UserCustomerInfo } from "@/(FSD)/shareds/types/manager/UserCustomerInfo.type";
import { useQuery } from "@tanstack/react-query";

export const ALL_USERS_QUERY_KEY = ['all_users'] as const;

export const useGetAllUsers = () => {
    const fetchData = useFetchData();

    return useQuery<UserCustomerInfo[]>({
        queryKey: ["all_users"],
        queryFn: () => fetchData({ path: "/manager", isAuthRequired: true }),
    });
};