import React, { useEffect, useRef } from 'react';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { m } from 'framer-motion';

// assets
import { MaintenanceIllustration } from '~/shared/assets';

import Page from '../../Page';
import { MotionContainer, varBounce } from '../../animate';

import { fetchNewLog } from '~/entities/log/api';

// ----------------------------------------------------------------------

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

export default function ErrorRenderComponent({ error }) {
    const hasLogged = useRef(false);

    useEffect(() => {
        async function fetchLog() {
            if (hasLogged.current) return;
            hasLogged.current = true;

            await fetchNewLog({
                level: 'ERROR',
                message: error?.message,
                service: 'frontend',
                extra: {
                    error,
                    errorInfo: error,
                    stack: error?.stack,
                },
            });
        }

        if (error) fetchLog();
    }, [error]);
    
    return (
        <Page title="404 Page Not Found">
            <Container component={MotionContainer}>
                <ContentStyle
                    sx={{ alignItems: 'center', textAlign: 'center' }}
                >
                    <m.div variants={varBounce().in}>
                        <Typography paragraph variant="h3">
                            Извините, в течение рендера произошла ошибка
                        </Typography>
                    </m.div>

                    <m.div variants={varBounce().in}>
                        <Typography sx={{ color: 'text.secondary' }}>
                            Пожалуйста, попробуйте позже или обратитесь к
                            администратору прикрепив сообщение ниже.
                        </Typography>
                    </m.div>

                    <m.div variants={varBounce().in}>
                        <Typography>
                            Сообщение: {error?.message}
                            {error?.stack}
                        </Typography>
                    </m.div>

                    <m.div variants={varBounce().in}>
                        <MaintenanceIllustration
                            sx={{ height: 260, my: { sm: 10, xs: 5 } }}
                        />
                    </m.div>
                </ContentStyle>
            </Container>
        </Page>
    );
}