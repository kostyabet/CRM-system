import { Box, Divider, MenuItem, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { useUserInfo } from './../../../../entities/user';
import MenuPopover from './../../../../components/MenuPopover';
import MyAvatar from './../../../../components/MyAvatar';
import { IconButtonAnimate } from './../../../../components/animate';
import useAuth from './../../../../shared/hooks/useAuth';
import useIsMountedRef from './../../../../shared/hooks/useIsMountedRef';

import { PATH_AUTH, PATH_DASHBOARD } from './../../../router/paths';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
    {
        label: 'Домой',
        linkTo: '/app',
    },
    {
        label: 'Профиль',
        linkTo: PATH_DASHBOARD.user.profile,
    },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
    const navigate = useNavigate();

    const { logout } = useAuth();
    // const { data: user } = useUserInfo();
    const user = useUserInfo();
    
    const isMountedRef = useIsMountedRef();

    const { enqueueSnackbar } = useSnackbar();

    const [open, setOpen] = useState(null);

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate(PATH_AUTH.login, { replace: true });

            if (isMountedRef.current) {
                handleClose();
            }
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Unable to logout!', { variant: 'error' });
        }
    };

    const handleClearCache = async () => {
        caches.keys().then((names) => {
            names.forEach((name) => {
                caches.delete(name);
            });
        });
        window.location.reload(true);
    };

    return (
        <>
            <IconButtonAnimate
                onClick={handleOpen}
                sx={{
                    p: 0,
                    ...(open && {
                        '&:before': {
                            bgcolor: (theme) =>
                                alpha(theme.palette.grey[900], 0.8),
                            borderRadius: '50%',
                            content: "''",
                            height: '100%',
                            position: 'absolute',
                            width: '100%',
                            zIndex: 1,
                        },
                    }),
                }}
            >
                <MyAvatar />
            </IconButtonAnimate>

            <MenuPopover
                anchorEl={open}
                onClose={handleClose}
                open={Boolean(open)}
                sx={{
                    '& .MuiMenuItem-root': {
                        borderRadius: 0.75,
                        typography: 'body2',
                    },
                    ml: 0.75,
                    mt: 1.5,
                    p: 0,
                }}
            >
                <Box sx={{ my: 1.5, px: 2.5 }}>
                    <Typography noWrap variant="subtitle2">
                        {user?.name?.displayName}
                    </Typography>
                    <Typography
                        noWrap
                        sx={{ color: 'text.secondary' }}
                        variant="body2"
                    >
                        {user?.email}
                    </Typography>
                </Box>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Stack sx={{ p: 1 }}>
                    {MENU_OPTIONS.map((option) => (
                        <MenuItem
                            component={RouterLink}
                            key={option.label}
                            onClick={handleClose}
                            to={option.linkTo}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                    <MenuItem onClick={handleClearCache}>Очистить кэш</MenuItem>
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
                    Выйти
                </MenuItem>
            </MenuPopover>
        </>
    );
}
