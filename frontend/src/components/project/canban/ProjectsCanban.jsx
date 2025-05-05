import { Grid, Card, Paper, Typography, Divider } from '@mui/material';
import React from 'react';
import { ProjectKanbanCard } from './KanbanTaskCard';
import { useUserInfo } from '../../../entities/user';
import { useUserTasksById, useTaskStates } from '../../../entities/task';
import CircularProgressCustom from '~/components/common/loading/CircularProgress';

// const sampleTasks = [
//     { id: 1, title: "Task 1", status: "To Do" },
//     { id: 2, title: "Task 2", status: "In Progress" },
//     { id: 3, title: "Task 3", status: "On Review" },
//     { id: 4, title: "Task 4", status: "Completed" },
//     { id: 5, title: "Task 5", status: "To Do" },
//     { id: 6, title: "Task 6", status: "In Progress" },
//     { id: 7, title: "Task 7", status: "On Review" },
//     { id: 8, title: "Task 8", status: "Completed" },
// ];

const columns = [
    { label: "To Do" },
    { label: "In Progress" },
    { label: "On Review" },
    { label: "Completed" },
];

export const ProjectsKanban = () => {

    const { data: user, isLoading: isLoadingUser } = useUserInfo();
    const { data: states, isLoading: isLoadingStates } = useTaskStates();
    const { data: tasks, isLoading: isLoadingTasks } = useUserTasksById(user?.id);

    if (isLoadingUser || isLoadingTasks || isLoadingStates)
        return <CircularProgressCustom />;

    return (
        <Grid container spacing={2} sx={{ mb: 3 }}>
            {states.states.filter(state => state.id !== 5).map((state) => (
                <Grid item sx={{ width: { md: '23.71%' } }} key={state.id}>
                    <Card>
                        <Typography variant="h6" sx={{ mb: 2, px: 2, pt: 2 }}>{state.RU}</Typography>
                        <Divider />
                        <Grid container spacing={1} sx={{ py: 2 }}>
                            {tasks.filter(task => task.priority === state.id).map((task) => (
                                <Grid item sx={{ width: { md: '100%' }, mx: 1 }} key={task.id}>
                                    <ProjectKanbanCard task={task}/>
                                </Grid>
                            ))}
                        </Grid>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};
