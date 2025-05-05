import React from 'react';
import { Container } from '@mui/material';
import { useSnackbar } from 'notistack';
import { PATH_DASHBOARD } from './../../application/router/paths';
import HeaderBreadcrumbs from './../../components/HeaderBreadcrumbs';
import Page from './../../components/Page';
import useSettings from './../../shared/hooks/useSettings';
import { useNavigate } from 'react-router-dom';
import ProjectInfoCard from '~/components/project/ProjectInfoCard';

export default function NewProjectPage() {
    const { themeStretch } = useSettings();
    
    return(
        <Page title="Создание новой задачи">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Создание новой задачи"
                    links={[
                        { href: PATH_DASHBOARD.general.app, name: 'Dashboard' },
                        {
                            href: PATH_DASHBOARD.projects.root,
                            name: 'Задачи',
                        },
                        { name: 'Новая задача' },
                    ]}
                />
                
                <ProjectInfoCard 
                    project={null}
                    isEditing
                />
            </Container>
        </Page>
    )
}