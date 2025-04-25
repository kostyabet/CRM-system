import {
    Box,
    Card,
    Container,
    Stack,
    Tooltip,
    Typography,
    Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { capitalCase } from 'change-case';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from './../../sections/auth/login';
import useAuth from './../../shared/hooks/useAuth';
import useResponsive from './../../shared/hooks/useResponsive';
import Page from './../../components/Page';
import Logo from './../../components/Logo';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { PATH_AUTH, PATH_DASHBOARD } from './../../application/router/paths';

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

export default function RegisterPage() {
    const { method } = useAuth();

    const navigate = useNavigate();

    const mdUp = useResponsive('up', 'md');

    return (
        <Page title="Register">
            <RootStyle>
                <HeaderStyle>
                    <Logo />
                </HeaderStyle>

                <Container maxWidth="sm">
                    <ContentStyle>
                        <Stack
                            alignItems="center"
                            direction="row"
                            sx={{ mb: 5 }}
                        >
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h4">
                                    Создание нового аккаунта
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>
                                    Введите свои учетные данные ниже
                                </Typography>
                            </Box>

                            <Tooltip
                                placement="right"
                                title={capitalCase(method)}
                            >
                                <HowToRegIcon sx={{ height: 32, width: 32 }}/>
                            </Tooltip>
                        </Stack>
                        <RegisterForm />
                        <Stack
                            alignItems="center"
                        >
                            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }} alignItems={"center"}>
                                У вас уже есть аккаунт?{' '}
                                <Button variant="text" onClick={() => navigate(PATH_AUTH.login)}>
                                    Войти
                                </Button>
                            </Typography>
                        </Stack>
                    </ContentStyle>
                </Container>

            </RootStyle>
        </Page>
    )
}