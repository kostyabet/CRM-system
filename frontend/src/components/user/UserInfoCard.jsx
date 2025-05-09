import React, { useState } from 'react';
import { 
    Card,
    Typography,
    Stack,
    Button
} from '@mui/material';
import { UserInfo } from './UserInfo';
import { EditUserInfo } from './EditUserInfo';

export default function UserInfoCard({
    user,
    refetch,
    isEditable = false
}) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <Card sx={{ p: 3, mb: 3, width: '100%' }}>
            <Stack spacing={2}>
                <Typography variant="h6" gutterBottom>
                    {!isEditing 
                        ? "Информация о пользователе"
                        : "Редактирование информации о пользователе"
                    }
                </Typography>
                {!isEditing
                    ? <UserInfo user={user} />
                    : <EditUserInfo user={user} onCancel={() => setIsEditing(false)} refetch={refetch}/>
                }
            </Stack>
            {!isEditing && isEditable && <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setIsEditing(!isEditing)}>
                Редактировать информацию
            </Button>}
        </Card>
    )
}