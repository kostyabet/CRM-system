import React from 'react';
import { Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { PATH_DASHBOARD, PATH_AUTH } from '~/application/router/paths';

import { useUserInfo, useUsersList } from '~/entities/user';

import HeaderBreadcrumbs from '~/components/HeaderBreadcrumbs';
import Page from '~/components/Page';
import ActionButton from '~/components/common/ActionButton';
import ErrorComponent from '~/components/common/error/ErrorRequestComponent';
import CircularProgressCustom from '~/components/common/loading/CircularProgress';
import useSettings from '~/shared/hooks/useSettings';

import UsersTable from '~/components/user/UsersTable/UsersTable';

export default function UsersListPage() {
    const { data: user } = useUserInfo();

    const { themeStretch } = useSettings();

    const { data: users, error, isLoading } = useUsersList();

    if (isLoading) {
        return <CircularProgressCustom />;
    }

    if (error) {
        return <ErrorComponent error={error} />;
    }

    return (
        <Page title="Пользователи: Список пользователей">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    action={
                        <ActionButton
                            component={RouterLink}
                            name="Добавить пользователя"
                            to={PATH_AUTH.register}
                        />
                    }
                    heading="Список пользователей"
                    links={[
                        { href: PATH_DASHBOARD.general.app, name: 'Dashboard' },
                        {
                            href: PATH_DASHBOARD.user.list,
                            name: 'Пользователи',
                        },
                        { name: 'Список' },
                    ]}
                />
                <UsersTable users={users.users} />
            </Container>
        </Page>
    );
}