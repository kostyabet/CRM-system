import { AppBar, Box, Stack, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';

import { HEADER, NAVBAR } from './../../../../application/config';
import Iconify from './../../../../components/Iconify';
import Logo from './../../../../components/Logo';
import useResponsive from './../../../../shared/hooks/useResponsive';
import cssStyles from './../../../../shared/utils/cssStyles';
import useOffSetTop from './../../../../shared/hooks/useOffSetTop';
import { IconButtonAnimate } from './../../../../components/animate';

import AccountPopover from './AccountPopover';

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar, {
    shouldForwardProp: (prop) =>
        prop !== 'isCollapse' &&
        prop !== 'isOffset' &&
        prop !== 'verticalLayout',
})(({ isCollapse, isOffset, theme, verticalLayout }) => ({
    ...cssStyles(theme).bgBlur(),
    boxShadow: 'none',
    height: HEADER.MOBILE_HEIGHT,
    [theme.breakpoints.up('lg')]: {
        height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
        width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
        ...(isCollapse && {
            width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
        }),
        ...(isOffset && {
            height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
        }),
        ...(verticalLayout && {
            backgroundColor: theme.palette.background.default,
            height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
            width: '100%',
        }),
    },
    transition: theme.transitions.create(['width', 'height'], {
        duration: theme.transitions.duration.shorter,
    }),
    zIndex: theme.zIndex.appBar + 1,
}));

// ----------------------------------------------------------------------

DashboardHeader.propTypes = {
    isCollapse: PropTypes.bool,
    onOpenSidebar: PropTypes.func,
    verticalLayout: PropTypes.bool,
};

export default function DashboardHeader({
    isCollapse = false,
    onOpenSidebar,
    verticalLayout = false,
}) {
    const isOffset =
        useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

    const isDesktop = useResponsive('up', 'lg');

    return (
        <>
            <RootStyle
                isCollapse={isCollapse}
                isOffset={isOffset}
                verticalLayout={verticalLayout}
            >
                <Toolbar
                    sx={{
                        minHeight: '100% !important',
                        px: { lg: 5 },
                    }}
                >
                    {isDesktop && verticalLayout && <Logo sx={{ mr: 2.5 }} />}

                    {!isDesktop && (
                        <IconButtonAnimate
                            onClick={onOpenSidebar}
                            sx={{ color: 'text.primary', mr: 1 }}
                        >
                            <Iconify icon="eva:menu-2-fill" />
                        </IconButtonAnimate>
                    )}

                    <Box sx={{ flexGrow: 1 }} />

                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={{ sm: 1.5, xs: 0.5 }}
                    >
                        <AccountPopover />
                    </Stack>
                </Toolbar>
            </RootStyle>
        </>
    );
}