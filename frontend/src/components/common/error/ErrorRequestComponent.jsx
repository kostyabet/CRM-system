import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { m } from 'framer-motion';
import React from 'react';

// assets
import { SeverErrorIllustration } from '~/shared/assets';

import Page from '../../Page';
import { MotionContainer, varBounce } from '../../animate';

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

export default function ErrorComponent({ error: { message } }) {
    return (
        <Page title="404 Page Not Found">
            <Container component={MotionContainer}>
                <ContentStyle
                    sx={{ alignItems: 'center', textAlign: 'center' }}
                >
                    <m.div variants={varBounce().in}>
                        <Typography paragraph variant="h3">
                            Извините, при получении данных произошла ошибка!
                        </Typography>
                    </m.div>

                    <m.div variants={varBounce().in}>
                        <Typography sx={{ color: 'text.secondary' }}>
                            Пожалуйста, попробуйте позже или обратитесь к
                            администратору прикрепив сообщение ниже.
                        </Typography>
                    </m.div>

                    <m.div variants={varBounce().in}>
                        <Typography>Сообщение: {message}</Typography>
                    </m.div>

                    <m.div variants={varBounce().in}>
                        <SeverErrorIllustration
                            sx={{ height: 260, my: { sm: 10, xs: 5 } }}
                        />
                    </m.div>
                </ContentStyle>
            </Container>
        </Page>
    );
}
