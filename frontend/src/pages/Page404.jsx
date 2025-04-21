import { Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';

import Page from './../components/Page';
import { PageNotFoundIllustration } from './../shared/assets';

const ContentStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 'auto',
    maxWidth: 480,
    minHeight: '100vh',
}));

export default function Page404() {
    return (
        <Page title="404 Page Not Found">
            <Container>
                <ContentStyle
                    sx={{ alignItems: 'center', textAlign: 'center' }}
                >
                    <m.div>
                        <Typography paragraph variant="h3">
                            Sorry, page not found!
                        </Typography>
                    </m.div>

                    <m.div>
                        <Typography sx={{ color: 'text.secondary' }}>
                            Sorry, we couldn’t find the page you’re looking for.
                            Perhaps you’ve mistyped the URL? Be sure to check
                            your spelling.
                        </Typography>
                    </m.div>

                    <m.div>
                        <PageNotFoundIllustration
                            sx={{ height: 260, my: { sm: 10, xs: 5 } }}
                        />
                    </m.div>
                    <Button
                        component={RouterLink}
                        size="large"
                        to="/"
                        variant="contained"
                    >
                        Go to Home
                    </Button>        
                </ContentStyle>
            </Container>
        </Page>
    )
}