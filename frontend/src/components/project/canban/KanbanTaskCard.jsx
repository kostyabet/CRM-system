import {
    Card,
    Typography,
    Button,
} from '@mui/material';
import React from 'react';
import { fDateShort } from '~/shared/utils/auxiliaryFn';
import { useTheme } from '@mui/material/styles';
import Label from '~/components/Label';

export const ProjectKanbanCard = ({ 
    task,
    onClick
}) => {
    const theme = useTheme();

    const now = new Date();
    const start = new Date(task.startAt);
    const end = new Date(task.endAt);
    let backgroundColor = 'transparent';

    if (now >= start && now <= end) {
        backgroundColor = 'rgba(0, 255, 0, 0.1)';
    } else if (now > end) {
        backgroundColor = 'rgba(255, 0, 0, 0.1)';
    }
    
    return (
        <Card
            sx={{
                p: 2,
                backgroundColor: backgroundColor // Apply the background color
            }}
            onClick={() => onClick(task.id)}
        >
            <Typography
                variant="body2"
            >
                {task.name}
            </Typography>

            <Typography
                variant="body2"
                sx={{
                    color: 'text.secondary'
                }}
            >
                {fDateShort(task.startAt)} - {fDateShort(task.endAt)}
            </Typography>

            <Label
                variant={
                    theme.palette.mode === 'light' ? 'ghost' : 'filled'
                }
                color={task.priority === 1 ? 'success' : 
                       task.priority === 2 ? "warning" : "error"}
            >
                {task.t_priority.RU}
            </Label>
        </Card>
    )
}