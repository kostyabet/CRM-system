import React from 'react'
import { useUserInfo } from './../../entities/user';
import Page from './../../components/Page';
import useSettings from './../../shared/hooks/useSettings';
import {
    Container,
    Box,
    Typography,
    Grid
} from '@mui/material';
import { ProjectsSummary } from '~/widgets/projects-summary';
import { ProjectsKanban } from '~/components/project/canban/ProjectsCanban'

export default function MainPage() {
    const { data: user } = useUserInfo();

    const { themeStretch } = useSettings();

    return (
        <Page title="General: App">
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Box>
                    <Typography gutterBottom variant="h4">
                        👋 Привет, {user?.firstName}
                    </Typography>
                </Box>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <ProjectsSummary />
                </Grid>
                <ProjectsKanban />
            </Container> 
        </Page>
    )
}