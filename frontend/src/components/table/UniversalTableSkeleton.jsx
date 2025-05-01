import { Skeleton, TableCell, TableRow } from '@mui/material';
import React from 'react';

// ----------------------------------------------------------------------

export default function TableSkeleton({
    cell,
    row,
    ...other
}) {
    return (
        <>
            {Array.from({ length: row || 1 }, (_, index) => {
                return (
                    <TableRow key={index} {...other}>
                        {Array.from({ length: cell }, (_, index) => {
                            return (
                                <TableCell key={index}>
                                    <Skeleton
                                        height={36}
                                        variant="text"
                                        width="100%"
                                    />
                                </TableCell>
                            );
                        })}
                    </TableRow>
                );
            })}
        </>
    );
}
