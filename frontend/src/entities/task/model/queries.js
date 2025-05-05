import { useQuery } from '@tanstack/react-query';
import { 
    fetchTaskById, 
    fetchTaskStates, 
    fetchTaskPriorities, 
    fetchUserTasksById,
    fetchAllTasks,
    fetchProjectsSummary
} from '../api';
import { 
    TASK_BY_ID_QUERY_KEY, 
    TASK_STATES_QUERY_KEY, 
    TASK_PRIORITIES_QUERY_KEY, 
    USER_TASKS_BY_ID_QUERY_KEY,
    TASKS_QUERY_KEY,
    PROJECTS_SUMMARY_QUERY_KEY
} from '../constants';

export const useTaskById = (id) => {
    return useQuery({
        queryKey: [TASK_BY_ID_QUERY_KEY, id],
        queryFn: () => fetchTaskById(id),
        enabled: !!id,
        retry: false,
    });
};

export const useTaskStates = () => {
    return useQuery({
        queryKey: [TASK_STATES_QUERY_KEY],
        queryFn: fetchTaskStates,
    });
}

export const useTaskPriorities = () => {
    return useQuery({
        queryKey: [TASK_PRIORITIES_QUERY_KEY],
        queryFn: fetchTaskPriorities,
    });
}

export const useUserTasksById = (userId) => {
    return useQuery({
        queryFn: () => fetchUserTasksById(userId),
        queryKey: [USER_TASKS_BY_ID_QUERY_KEY],
        enabled: !!userId,
    });
}

export const useAllTasks = () => {
    return useQuery({
        queryFn: () => fetchAllTasks(),
        queryKey: [TASKS_QUERY_KEY],
    });
}

export const useProjectsSummary = () => {
    return useQuery({
        queryFn: fetchProjectsSummary,
        queryKey: [PROJECTS_SUMMARY_QUERY_KEY],
    });
}