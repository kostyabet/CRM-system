import { Box, Drawer, Stack } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { hideScrollY } from './../../../providers/theme-provider/styles';
import { NAVBAR } from './../../../config';
import Logo from './../../../../components/Logo';
import Scrollbar from './../../../../components/Scrollbar';
import { NavSectionVertical , NavSectionMini} from './../../../../components/nav-section';
import useCollapseDrawer from './../../../../shared/hooks/useCollapseDrawer';
import useResponsive from './../../../../shared/hooks/useResponsive';
import cssStyles from './../../../../shared/utils/cssStyles';

import CollapseButton from './CollapseButton';
import navConfig from './NavConfig';
import NavbarAccount from './NavbarAccount';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('lg')]: {
        flexShrink: 0,
        transition: theme.transitions.create('width', {
            duration: theme.transitions.duration.shorter,
        }),
    },
}));

// ----------------------------------------------------------------------

NavbarVertical.propTypes = {
    isOpenSidebar: PropTypes.bool,
    onCloseSidebar: PropTypes.func,
};

export default function NavbarVertical({ isOpenSidebar, onCloseSidebar }) {
    const theme = useTheme();

    const { pathname } = useLocation();

    const isDesktop = useResponsive('up', 'lg');

    const {
        collapseClick,
        collapseHover,
        isCollapse,
        onHoverEnter,
        onHoverLeave,
        onToggleCollapse,
    } = useCollapseDrawer();
    console.log(collapseClick, useCollapseDrawer());

    useEffect(() => {
        if (isOpenSidebar) {
            onCloseSidebar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);



    const renderContent = (
        <Scrollbar
            sx={{
                '& .simplebar-content': {
                    display: 'flex',
                    flexDirection: 'column',
                    height: 1,
                },
                height: 1,
            }}
        >
            <Stack
                spacing={3}
                sx={{
                    flexShrink: 0,
                    pb: 2,
                    pt: 3,
                    px: 2.5,
                    ...(isCollapse && { alignItems: 'center' }),
                }}
            >
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                >
                    <Logo />

                    {isDesktop && !isCollapse && (
                        <CollapseButton
                            collapseClick={collapseClick}
                            onToggleCollapse={onToggleCollapse}
                        />
                    )}
                </Stack>

                <NavbarAccount isCollapse={isCollapse} />
            </Stack>
            
            {
                isCollapse ? (
                    <NavSectionMini
                        data={navConfig}
                        sx={{ pb: 2, px: 0.5, ...hideScrollY, flex: '1 1 auto', overflowY: 'auto' }}
                    />
                ) : (
                    <NavSectionVertical data={navConfig} />    
                )                
            }
            
            <Box sx={{ flexGrow: 1 }} />
        </Scrollbar>
    );

    return (
        <RootStyle
            sx={{
                width: {
                    lg: isCollapse
                        ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH
                        : NAVBAR.DASHBOARD_WIDTH,
                },
                ...(collapseClick && {
                    position: 'absolute',
                }),
            }}
        >
            {!isDesktop && (
                <Drawer
                    PaperProps={{ sx: { width: NAVBAR.DASHBOARD_WIDTH } }}
                    onClose={onCloseSidebar}
                    open={isOpenSidebar}
                >
                    {renderContent}
                </Drawer>
            )}

            {isDesktop && (
                <Drawer
                    PaperProps={{
                        sx: {
                            bgcolor: 'background.default',
                            borderRightStyle: 'dashed',
                            transition: (theme) =>
                                theme.transitions.create('width', {
                                    duration:
                                        theme.transitions.duration.standard,
                                }),
                            width: NAVBAR.DASHBOARD_WIDTH,
                            ...(isCollapse && {
                                width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
                            }),
                            ...(collapseHover && {
                                ...cssStyles(theme).bgBlur(),
                                boxShadow: (theme) => theme.customShadows.z24,
                            }),
                        },
                    }}
                    onMouseEnter={onHoverEnter}
                    onMouseLeave={onHoverLeave}
                    open
                    variant="persistent"
                >
                    {renderContent}
                </Drawer>
            )}
        </RootStyle>
    );
}
