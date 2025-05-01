import { httpClient } from '~/shared/api';

export const fetchUserInfo = async () => {
    const response = await httpClient.get('/auth/me');
    return response.data;
};

export const fetchUpdateUser = async (userData) => {
    const response = await httpClient.put('/auth/me', userData);
    return response.data;
}

export const fetchUsersList = async () => {
    const response = await httpClient.get('/auth/getAllUsers');
    return response.data;
}

export const fetchUserInfoById = async (id) => {
    const response = await httpClient.get(`/auth/getUser/${id}`);
    return response.data;
}