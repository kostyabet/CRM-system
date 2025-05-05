import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Avatar,
    IconButton,
    TableCell,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';

import Label from '~/components/Label';

// ----------------------------------------------------------------------

UsersTableRow.propTypes = {
    onOpenUser: PropTypes.func,
    rowData: PropTypes.object,
    user: PropTypes.object,
};

export default function UsersTableRow({ 
    isEditing,
    onDeleteUser,
    onOpenUser,
    rowData,
    user
}) {
    const theme = useTheme();

    const { id, firstName, lastName, email, phone, role, photoUrl: avatar } = rowData;

    return (
        <TableRow hover>
            <TableCell align="left">
                <Label
                    sx={{ textTransform: 'capitalize' }}
                    variant={
                        theme.palette.mode === 'light' ? 'ghost' : 'filled'
                    }
                >
                    {id}
                </Label>
            </TableCell>

            <TableCell sx={{ alignItems: 'center', display: 'flex' }}>
                <Avatar alt={firstName} src={avatar} sx={{ mr: 2 }} />
                <Typography noWrap variant="subtitle2">
                    {firstName} {lastName}
                </Typography>
            </TableCell>

            <TableCell align="left">
                <Label
                    sx={{ textTransform: 'capitalize' }}
                    variant={
                        theme.palette.mode === 'light' ? 'ghost' : 'filled'
                    }
                >
                    {email}
                </Label>
            </TableCell>

            <TableCell align="left">
                <Label
                    sx={{ textTransform: 'capitalize' }}
                    variant={
                        theme.palette.mode === 'light' ? 'ghost' : 'filled'
                    }
                >
                    {phone}
                </Label>
            </TableCell>

            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                {role}
            </TableCell>

            <TableCell align="right">
                <Tooltip title="Подробнее">
                    <IconButton onClick={onOpenUser}>
                        <OpenInNewIcon />
                    </IconButton>
                </Tooltip>
                {isEditing && (
                    <Tooltip title="Удалить">
                        <IconButton
                            onClick={() => onDeleteUser(id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </TableCell>
        </TableRow>
    );
}