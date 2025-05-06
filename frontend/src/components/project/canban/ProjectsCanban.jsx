import { Grid, Card, Paper, Typography, Divider } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { ProjectKanbanCard } from './KanbanTaskCard';
import { useUserInfo } from '../../../entities/user';
import { useUserTasksById, useTaskStates } from '../../../entities/task';
import CircularProgressCustom from '~/components/common/loading/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '~/application/router/paths';

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
    const [sortedTasks, setSortedTasks] = useState(null);
    const { data: user, isLoading: isLoadingUser } = useUserInfo();
    const { data: states, isLoading: isLoadingStates } = useTaskStates();
    const { data: tasks, isLoading: isLoadingTasks } = useUserTasksById(user?.id);
    const navigate = useNavigate();

    useEffect(() => {
        if (!tasks) return;
        const sorted = [...tasks].sort((a, b) => {
            if (b.priority - a.priority !== 0) {
                return b.priority - a.priority;
            }

            const dateA = new Date(a.deadline);
            const dateB = new Date(b.deadline);

            return dateA.getTime() - dateB.getTime();
        });
        setSortedTasks(sorted);
    }, [tasks]);

    if (isLoadingUser || isLoadingTasks || isLoadingStates || !sortedTasks)
        return <CircularProgressCustom />;

    const handleClickCard = (id) => {
        navigate(PATH_DASHBOARD.projects.user(id));
    }

    return (
        <>
            <Card sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ px: 2, pt: 2 }}>{states.states.find(item => item?.id === 5).RU}</Typography>
                <Grid container spacing={1} sx={{ py: 2 }}>
                    {sortedTasks.filter(task => task.state === 5).map((task) => (
                        <Grid item sx={{ width: { md: '100%' }, mx: 1 }} key={task.id}>
                            <ProjectKanbanCard task={task}/>
                        </Grid>
                    ))}
                </Grid>
            </Card>

            <Grid container spacing={2} sx={{ mb: 3 }}>
                {states.states.filter(state => state.id !== 5).map((state) => (
                    <Grid item sx={{ width: { md: '23.71%' } }} key={state.id}>
                        <Card>
                            <Typography variant="h6" sx={{ mb: 2, px: 2, pt: 2 }}>{state.RU}</Typography>
                            <Divider />
                            <Grid container spacing={1} sx={{ py: 2 }}>
                                {sortedTasks.filter(task => task.state === state.id).map((task) => (
                                    <Grid item sx={{ width: { md: '100%' }, mx: 1 }} key={task.id}>
                                        <ProjectKanbanCard
                                            task={task}
                                            onClick={handleClickCard}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};
