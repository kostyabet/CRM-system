import { useQuery } from '@tanstack/react-query';
import { fetchUserInfo } from '../api';
import { USER_INFO_QUERY_KEY } from '../constants';

export const useUserInfo = () => {
    return useQuery({
        queryFn: fetchUserInfo,
        queryKey: [USER_INFO_QUERY_KEY],
    });
};