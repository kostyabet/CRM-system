import React from 'react'
import { useUserInfo } from './../../entities/user';
import Page from './../../components/Page';
import useSettings from './../../shared/hooks/useSettings';
import {
    Container,
    Box,
    Typography
} from '@mui/material';

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
                This is text message!
            </Container> 
        </Page>
    )
}