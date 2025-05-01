import {
    Box,
    Checkbox,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from '@mui/material';
import PropTypes from 'prop-types';
import useResponsive from '~/shared/hooks/useResponsive';
import React from 'react';

// ----------------------------------------------------------------------

const visuallyHidden = {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px',
};

// ----------------------------------------------------------------------

TableHeadCustom.propTypes = {
    headLabel: PropTypes.array,
    sx: PropTypes.object,
};

export default function TableHeadCustom({
    headLabel,
    sx,
}) {
    return (
        <TableHead sx={sx}>
            <TableRow sx={{width: '100%'}}>
                {headLabel.map((headCell) => (
                    <TableCell
                        align={headCell.align || 'left'}
                        key={headCell.id}
                        sx={{
                            minWidth: headCell.minWidth,
                            width: headCell.width,
                        }}
                    >
                        <>
                            {headCell?.component && headCell?.component}
                            {headCell.label}
                        </>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}