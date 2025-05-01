import { useQuery } from '@tanstack/react-query';
import { fetchUserInfo, fetchUsersList } from '../api';
import { USER_INFO_QUERY_KEY, USERS_LIST_QUERY_KEY } from '../constants';

export const useUserInfo = () => {
    return useQuery({
        queryFn: fetchUserInfo,
        queryKey: [USER_INFO_QUERY_KEY],
    });
};

export const useUsersList = () => {
    return useQuery({
        queryFn: fetchUsersList,
        queryKey: [USERS_LIST_QUERY_KEY],
    });
}