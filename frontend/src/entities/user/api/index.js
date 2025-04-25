import { httpClient } from '~/shared/api';

export const fetchUserInfo = async () => {
    const response = await httpClient.get('/auth/me');
    return response.data;
};