import React from 'react';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from './../../application/router/paths';
import HeaderBreadcrumbs from './../../components/HeaderBreadcrumbs';
import Page from './../../components/Page';
import useSettings from './../../shared/hooks/useSettings';
import { useAllTasks } from '~/entities/task';
import ProjectsTable from '~/components/project/ProjectsTable';
import CircularProgressCustom from '~/components/common/loading/CircularProgress';

export default function AllProjectsPage() {
    const { themeStretch } = useSettings();

    const { data: tasks, isLoading: isLoadingTasks } = useAllTasks();
    
    if (isLoadingTasks)
        return <CircularProgressCustom />;
    
    return(
        <Page title="Просмотр всех задач">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Просмотр всех задачи"
                    links={[
                        { href: PATH_DASHBOARD.general.app, name: 'Dashboard' },
                        {
                            href: PATH_DASHBOARD.projects.root,
                            name: 'Задачи',
                        },
                        { name: 'Все задачи' },
                    ]}
                />
                <ProjectsTable tasks={tasks?.tasks || null} />
            </Container>
        </Page>
    )
}