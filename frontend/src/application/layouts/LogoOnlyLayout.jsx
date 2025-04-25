import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import React from 'react';

import Logo from './../../components/Logo';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
    left: 0,
    lineHeight: 0,
    padding: theme.spacing(3, 3, 0),
    position: 'absolute',
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(5, 5, 0),
    },
    top: 0,
    width: '100%',
}));

// ----------------------------------------------------------------------

export default function LogoOnlyLayout() {
    return (
        <>
            <HeaderStyle>
                <Logo />
            </HeaderStyle>
            <Outlet />
        </>
    );
}
