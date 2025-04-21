import {
    Box,
    Card,
    Container,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { capitalCase } from 'change-case';
import React from 'react'

import { LoginForm } from './../../sections/auth/login';
import useAuth from './../../shared/hooks/useAuth';
import useResponsive from './../../shared/hooks/useResponsive';
import Page from './../../components/Page';
import Logo from './../../components/Logo';
import Image from './../../components/Image';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    lineHeight: 0,
    padding: theme.spacing(3),
    position: 'absolute',
    [theme.breakpoints.up('md')]: {
        alignItems: 'flex-start',
        padding: theme.spacing(7, 5, 0, 7),
    },
    top: 0,
    width: '100%',
    zIndex: 9,
}));

const SectionStyle = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2),
    maxWidth: 464,
    width: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 'auto',
    maxWidth: 480,
    minHeight: '100vh',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
    const { method } = useAuth();

    const mdUp = useResponsive('up', 'md');

    // Request example
    // fetch('http://localhost:80/api/auth/test', { method: 'GET' }).then((response) => {
    //     console.log(response);
    // })

    return (
        <Page title="Login">
            <RootStyle>
                <HeaderStyle>
                    <Logo />
                </HeaderStyle>

                {mdUp && (
                    <SectionStyle>
                        <Typography sx={{ mb: 5, mt: 10, px: 5 }} variant="h3">
                            Hi, Welcome Back
                        </Typography>
                        <Image
                            alt="login"
                            disabledEffect
                            src="/assets/illustrations/illustration_login.png"
                            visibleByDefault
                        />
                    </SectionStyle>
                )}

                <Container maxWidth="sm">
                    <ContentStyle>
                        <Stack
                            alignItems="center"
                            direction="row"
                            sx={{ mb: 5 }}
                        >
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h4">
                                    Sign in to Blackout
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>
                                    Enter your details below.
                                </Typography>
                            </Box>

                            <Tooltip
                                placement="right"
                                title={capitalCase(method)}
                            >
                                <>
                                    <Image
                                        disabledEffect
                                        src={`https://minimal-assets-api-dev.vercel.app/assets/icons/auth/ic_${method}.png`}
                                        sx={{ height: 32, width: 32 }}
                                    />
                                </>
                            </Tooltip>
                        </Stack>
                        <LoginForm />
                    </ContentStyle>
                </Container>

            </RootStyle>
        </Page>
    )
}