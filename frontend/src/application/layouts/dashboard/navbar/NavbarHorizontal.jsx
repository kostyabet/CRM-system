import { AppBar, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { memo } from 'react';

// config

import { HEADER } from './../../../../application/config';
import { NavSectionHorizontal } from './../../../../components/nav-section';

//
import navConfig from './NavConfig';

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.customShadows.z8,
    padding: theme.spacing(1, 0),
    position: 'fixed',
    top: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    transition: theme.transitions.create('top', {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeInOut,
    }),
    width: '100%',
    zIndex: theme.zIndex.appBar,
}));

// ----------------------------------------------------------------------

function NavbarHorizontal() {
    return (
        <RootStyle>
            <Container maxWidth={false}>
                <NavSectionHorizontal data={navConfig} />
            </Container>
        </RootStyle>
    );
}

export default memo(NavbarHorizontal);
