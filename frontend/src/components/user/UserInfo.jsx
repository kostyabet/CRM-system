import React from 'react';
import {
    Typography,
    Stack,
} from '@mui/material';

export const UserInfo = ({
    user
}) => {
    return (
        <Stack>
            <Typography variant="body1" gutterBottom>
                Логин: {user?.login}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Имя: {user?.firstName}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Фамилия: {user?.lastName}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Номер телефона: {user?.phone}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Почта: {user?.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Роль: {user?.role}
            </Typography>
        </Stack>
    );
}