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
import { fDateShort } from '~/shared/utils/auxiliaryFn';

// ----------------------------------------------------------------------

TaskTableRow.propTypes = {
    onOpenTask: PropTypes.func,
    rowData: PropTypes.object,
};

export default function TaskTableRow({ 
    onOpenTask,
    rowData,
}) {
    const theme = useTheme();

    const { id, name, startAt, endAt, t_priority, t_state } = rowData;

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

            <TableCell sx={{ textTransform: 'capitalize' }}>
                <Typography noWrap variant="subtitle2" sx={{alignItems: 'center'}}>
                    {name}
                </Typography>
            </TableCell>

            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                {t_priority?.RU}
            </TableCell>

            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                {t_state?.RU}
            </TableCell>

            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                {fDateShort(startAt)} - {fDateShort(endAt)}
            </TableCell>

            <TableCell align="right">
                <Tooltip title="Подробнее">
                    <IconButton onClick={onOpenTask}>
                        <OpenInNewIcon />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
}