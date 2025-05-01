import { Card } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useUserInfo } from '~/entities/user';
import { PATH_DASHBOARD } from '~/application/router/paths';
import UsersTableRow from '~/components/user/UsersTable/UsersTableRow';
import { UniversalTable } from '~/components/table';

// ----------------------------------------------------------------------

const tableHead = [
    { align: 'left', id: 'id', label: 'ID', width: '6%' },
    { align: 'left', id: 'name', label: 'Имя', width: '35%' },
    { align: 'left', id: 'email', label: 'Email', width: '19%' },
    { align: 'left', id: 'phone', label: 'Телефон', width: '19%' },
    { align: 'left', id: 'role', label: 'Роль', width: '19%' },
    { align: 'right', id: 'link', label: '', width: '2%' }
];

// ----------------------------------------------------------------------

export default function UsersTable({ users }) {
    const navigate = useNavigate();

    const { data: user } = useUserInfo();

    const handleOpenUser = (id) => {
        navigate(PATH_DASHBOARD.user.profileAnother(id));
    };

    const renderTableRow = (rowData) => (
        <UsersTableRow
            key={rowData.id}
            onOpenUser={() => handleOpenUser(rowData.id)}
            rowData={rowData}
            user={user}
        />
    );

    return (
        <Card>
            <UniversalTable
                defaultTableSettings={{
                    defaultOrder: 'asc',
                    defaultOrderBy: 'name.fullName',
                }}
                renderTableRow={renderTableRow}
                tableData={users}
                tableHead={tableHead}
            />
        </Card>
    );
}