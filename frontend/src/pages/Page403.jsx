import { Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';

import Page from './../components/Page';
import { ForbiddenIllustration } from './../shared/assets';

const ContentStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 'auto',
    maxWidth: 480,
    minHeight: '100vh',
}));


export default function Page403() {
    return (
        <Page title="403 Forbidden">
            <Container>
                <ContentStyle
                    sx={{ alignItems: 'center', textAlign: 'center' }}
                >
                    <m.div>
                        <Typography paragraph variant="h3">
                            No permission
                        </Typography>
                    </m.div>

                    <m.div>
                        <Typography sx={{ color: 'text.secondary' }}>
                            The page you're trying access has restricted access.
                            <br />
                            Please refer to your system administrator
                        </Typography>
                    </m.div>

                    <m.div>
                        <ForbiddenIllustration
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