import React from 'react';
import { Container, Stack } from '@mui/material';
import { PATH_DASHBOARD } from './../../application/router/paths';
import { useUserInfo } from './../../entities/user';
import { useUserTasksById } from '~/entities/task';
import HeaderBreadcrumbs from './../../components/HeaderBreadcrumbs';
import Page from './../../components/Page';
import useSettings from './../../shared/hooks/useSettings';
import CircularProgressCustom from '~/components/common/loading/CircularProgress';
import ProjectsTable from '~/components/project/ProjectsTable';
import { useNavigate } from 'react-router-dom';
import ActionButton from '~/components/common/ActionButton';

export default function ProjectsPage() {
    const { themeStretch } = useSettings();
    const navigate = useNavigate();

    const { data: user, isLoading } = useUserInfo();
    const { data: tasks, isLoading: isLoadingTasks } = useUserTasksById(user?.id);
    
    if (isLoading || isLoadingTasks)
        return <CircularProgressCustom />;

    return(
        <Page title="Задачи текущего пользователя">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading={`Просмотр задач ${user.firstName} ${user.lastName}`}
                    links={[
                        { href: PATH_DASHBOARD.general.app, name: 'Dashboard' },
                        {
                            href: PATH_DASHBOARD.projects.root,
                            name: 'Задачи',
                        },
                        { name: `${user.firstName} ${user.lastName}` },
                    ]}
                    action={
                        <Stack
                            alignItems={'start'}
                            direction={{ sm: 'row', xs: 'column' }}
                            gap={1}
                        >
                            <ActionButton
                                name="Добавить задачу"
                                color="success"
                                onClick={() => navigate(PATH_DASHBOARD.projects.new)}
                            />
                        </Stack>
                    }
                />
                <ProjectsTable tasks={tasks} />
            </Container>
        </Page>
    )
}