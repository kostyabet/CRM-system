import { TableCell, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

//
import EmptyContent from '~/components/EmptyContent';

// ----------------------------------------------------------------------

TableNoData.propTypes = {
    isNotFound: PropTypes.bool,
};

export default function TableNoData({ colSpan = 12, isNotFound }) {
    return (
        <TableRow>
            {isNotFound ? (
                <TableCell colSpan={colSpan}>
                    <EmptyContent
                        sx={{
                            '& span.MuiBox-root': { height: 160 },
                        }}
                        title="Нет данных"
                    />
                </TableCell>
            ) : (
                <TableCell colSpan={colSpan} sx={{ p: 0 }} />
            )}
        </TableRow>
    );
}
