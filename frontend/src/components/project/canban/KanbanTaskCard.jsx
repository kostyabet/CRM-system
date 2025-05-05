import {
    Card,
    Typography
} from '@mui/material';
import React from 'react';
import { fDateShort } from '~/shared/utils/auxiliaryFn';

export const ProjectKanbanCard = ({ task }) => {
    return (
        <Card
            sx={{
                p: 2
            }}
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
        </Card>
    )
}