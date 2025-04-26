import React from 'react';
import { 
    Card,
    Typography,
    Stack,
    Button
} from '@mui/material';

export default function UserInfo({
    user
}) {
    return (
        <Card sx={{ p: 3, mb: 3 }}>
            <Stack spacing={2}>
                <Typography variant="h6" gutterBottom>
                    Информация о пользователе
                </Typography>
                <Stack>
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
            </Stack>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => {}}>
                Редактировать информацию
            </Button>
        </Card>
    )
}