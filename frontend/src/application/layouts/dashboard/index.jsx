import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import React from 'react';

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
    return (
        <Outlet />
    );
}