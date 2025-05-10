import { httpClient } from '~/shared/api';

export const fetchNewLog = async (data) => {
    const response = await httpClient.post(`/log`, data)
    return response.data;
}