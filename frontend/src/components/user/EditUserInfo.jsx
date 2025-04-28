import React from 'react';
import { 
    Card,
    Typography,
    Stack,
    Button
} from '@mui/material';

export const EditUserInfo = ({ 
    user
}) => {
    return(
        <Stack spacing={1}>
            <Typography variant="body1" gutterBottom>
                Логин: {user?.login}
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