import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import React from 'react';

import { HEADER, NAVBAR } from './../../../application/config';
import useCollapseDrawer from './../../../shared/hooks/useCollapseDrawer';
import useResponsive from './../../../shared/hooks/useResponsive';
import useSettings from './../../../shared/hooks/useSettings';

import DashboardHeader from './header';
import NavbarHorizontal from './navbar/NavbarHorizontal';
import NavbarVertical from './navbar/NavbarVertical';

// ----------------------------------------------------------------------

const MainStyle = styled('main', {
    shouldForwardProp: (prop) => prop !== 'collapseClick',
})(({ collapseClick, theme }) => ({
    flexGrow: 1,
    paddingBottom: HEADER.MOBILE_HEIGHT /*  + 24 */,
    paddingTop: HEADER.MOBILE_HEIGHT /* + 24 */,
    [theme.breakpoints.up('lg')]: {
        paddingBottom: HEADER.DASHBOARD_DESKTOP_HEIGHT /*  + 24 */,
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT /* + 24 */,
        transition: theme.transitions.create('margin-left', {
            duration: theme.transitions.duration.shorter,
        }),
        width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
        ...(collapseClick && {
            marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
        }),
    },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
    const { collapseClick, isCollapse } = useCollapseDrawer();

    const { themeLayout } = useSettings();

    const isDesktop = useResponsive('up', 'lg');

    const [open, setOpen] = useState(false);

    const verticalLayout = themeLayout === 'vertical';

    if (verticalLayout) {
        return (
            <>
                <DashboardHeader
                    onOpenSidebar={() => setOpen(true)}
                    verticalLayout={verticalLayout}
                />
                {isDesktop ? (
                    <NavbarHorizontal />
                ) : (
                    <NavbarVertical
                        isOpenSidebar={open}
                        onCloseSidebar={() => setOpen(false)}
                    />
                )}

                <Box
                    component="main"
                    sx={{
                        pb: {
                            lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 24}px`,
                            xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
                        },
                        pt: {
                            lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 80}px`,
                            xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
                        },
                        px: { lg: 2 },
                    }}
                >
                    <Outlet />
                </Box>
            </>
        );
    }

    return (
        <Box
            sx={{
                display: { lg: 'flex' },
                minHeight: { lg: 1 },
            }}
        >
            <DashboardHeader
                isCollapse={isCollapse}
                onOpenSidebar={() => setOpen(true)}
            />

            <NavbarVertical
                isOpenSidebar={open}
                onCloseSidebar={() => setOpen(false)}
            />

            <MainStyle collapseClick={collapseClick}>
                <Outlet />
            </MainStyle>
        </Box>
    );
}