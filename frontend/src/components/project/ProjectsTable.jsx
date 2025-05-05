import { Card } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PATH_DASHBOARD } from '~/application/router/paths';
import { UniversalTable } from '~/components/table';
import TaskTableRow from './blocks/TaskTableRow';

// ----------------------------------------------------------------------

const tableHead = [
    { align: 'left', id: 'id', label: 'ID', width: '5%' },
    { align: 'left', id: 'name', label: 'Название', width: '22%' },
    { align: 'left', id: 'priority', label: 'Приоритет', width: '22%' },
    { align: 'left', id: 'state', label: 'Состояние', width: '22%' },
    { align: 'left', id: 'date', label: 'Продолжительность', width: '22%' },
    { align: 'right', id: 'link', label: '', width: '7%' }
];

// ----------------------------------------------------------------------

export default function ProjectsTable({
    tasks,
}) {
    const navigate = useNavigate();

    const handleOpenTask = (id) => {
        navigate(PATH_DASHBOARD.projects.user(id));
    }    

    const renderTableRow = (rowData) => (
        <TaskTableRow
            key={rowData.id}
            onOpenTask={() => handleOpenTask(rowData.id)}
            rowData={rowData}
        />
    );

    return (
        <Card>
            <UniversalTable
                isEditing={false}
                defaultTableSettings={{
                    defaultOrder: 'asc',
                    defaultOrderBy: 'name.fullName',
                }}
                renderTableRow={renderTableRow}
                tableData={tasks}
                tableHead={tableHead}
            />
        </Card>
    );
}