import {
    Card,
    Table,
    TableBody,
    TableContainer,
} from '@mui/material';
import React, { memo } from 'react';

import useResponsive from '~/shared/hooks/useResponsive';
import Scrollbar from '../Scrollbar';
import TableHeadCustom from './TableHeadCustom';
import TableNoData from './TableNoData';
import UniversalTableSkeleton from './UniversalTableSkeleton';

const UniversalTable = ({
    renderTableRow,
    tableData = [],
    tableHead = [],
    tableSx,
    isFetching
}) => {
    const isNotFound = !tableData.length;

    return (
        <Card>
            <Scrollbar>
                <TableContainer
                    sx={{
                        overflow: 'unset',
                        position: 'relative',
                        width: '100%',
                    }}
                >
                    <Table sx={tableSx}>
                        <TableHeadCustom
                            headLabel={tableHead}
                        />

                        <TableBody>
                            {isFetching ? (
                                <UniversalTableSkeleton
                                    cell={tableHead.length}
                                    row={tableData.length}
                                />
                            ) : (
                                <>
                                    {tableData
                                        .map((row, index) => {
                                            return renderTableRow(
                                                row,
                                            );
                                        })
                                    }
                                </>
                            )}
                            
                            <TableNoData
                                isNotFound={isNotFound && !isFetching}
                            />
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbar>
        </Card>
    );
};

export default memo(UniversalTable);
