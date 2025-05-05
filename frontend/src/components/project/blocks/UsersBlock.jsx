import React, { useState } from 'react';
import {
    Button,
    Stack,
    Tooltip,
    Typography
} from '@mui/material';
import UsersTable from '~/components/user/UsersTable/UsersTable';
import { useWatch } from 'react-hook-form';
import RHFAutocomplete from '~/components/hook-form/RHFAutocomplete';
import { useUsersList } from '~/entities/user'
import CircularProgressCustom from '~/components/common/loading/CircularProgress';
import { TableCell, TableRow } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import InfoIcon from '@mui/icons-material/Info';

export default function UsersBlock({
    isEditing
}) {
    const [selectedUser, setSelectedUser] = useState(null);
    const { setValue } = useFormContext();

    const [users] = useWatch({
        name: ['users'],
    });

    const { data: usersList, isLoading } = useUsersList();

    if (isLoading)
        return <CircularProgressCustom />;

    const onDeleteUser = (userId) => {
        setValue('users', [...users.filter((user) => user.id !== userId)]);
    }

    const onAddUser = () => {
        if (!selectedUser) return;
        const alreadyExists = users.some((u) => u.id === selectedUser.id);
        if (!alreadyExists) {
            setValue('users', [...users, selectedUser]);
        }
        setSelectedUser(null);
    }

    return (
        <Stack
            direction="column"
        >
            <Stack
                direction="row"
                alignItems={"center"}
            >
                <Typography variant='h5' sx={{ mb: 1 }}>
                    Участники
                </Typography>
                {isEditing && <Tooltip title="Создатель проекта добавляется автоматически!" placement="top">
                    <Typography variant='body2' sx={{ ml: 1 }} color="text.secondary">
                        <InfoIcon />
                    </Typography>
                </Tooltip>}
            </Stack>

            <UsersTable 
                users={users}
                isEditing={isEditing}
                onDeleteUser={(userId) => onDeleteUser(userId)}
                customEmptyContent={
                    <TableRow>
                        <TableCell colSpan={6}>
                            <Typography variant='body1' sx={{ mb: 1, textAlign: 'center' }}>Нет участников</Typography>
                        </TableCell>
                    </TableRow>
                }
            />

            {isEditing && (
                <Stack
                    direction="row"
                    sx={{
                        mt: 2
                    }}
                    spacing={2}
                    alignItems={"center"}
                >
                    <RHFAutocomplete
                        clearOnEscape
                        fullWidth
                        getOptionLabel={(option) =>
                            option.id + ' | ' + option.firstName + ' ' + option.lastName
                        }
                        label="Добавление участников"
                        name="autocompleteTemp"
                        options={usersList.users}
                        value={selectedUser}
                        onChangeSelect={(value) => {
                            setSelectedUser(value);
                        }}
                    />
                    <Button
                        disabled={!selectedUser}
                        onClick={() => onAddUser()}
                        variant="contained"
                    >
                        Добавить участника
                    </Button>
                </Stack>
            )}
        </Stack>
    )
}