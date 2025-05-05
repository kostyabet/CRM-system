import { httpClient } from '~/shared/api';

export const fetchTaskById = async (id) => {
    const response = await httpClient.get(`/tasks/${id}`)
    return response.data;
}

export const fetchTaskStates = async () => {
    const response = await httpClient.get('/state');
    return response.data;
}

export const fetchTaskPriorities = async () => {
    const response = await httpClient.get('/priority');
    return response.data;
}

export const fetchUserTasksById = async (userId) => {
    const response = await httpClient.get(`/tasks/user/${userId}`);
    return response.data;
}

export const fetchAllTasks = async () => {
    const response = await httpClient.get('/tasks');
    return response.data;
}

export const fetchCreateTask = async (data) => {
    const response = await httpClient.post('/tasks', data);
    return response.data;
}

export const fetchDeleteTask = async (id) => {
    const response = await httpClient.delete(`/tasks/${id}`);
    return response.data;
}

export const fetchUpdateTask = async (id, data) => {
    const response = await httpClient.put(`/tasks/${id}`, data);
    return response.data;
}

export const fetchProjectsSummary = async () => {
    const response = await httpClient.get(`/tasks/summary`);
    return response.data
}