import { Box, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { useUserInfo } from './../../../../entities/user';
import MyAvatar from './../../../../components/MyAvatar';

import { PATH_DASHBOARD } from '../../../router/paths';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    alignItems: 'center',
    backgroundColor: theme.palette.grey[500_12],
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    display: 'flex',
    padding: theme.spacing(2, 2.5),
    transition: theme.transitions.create('opacity', {
        duration: theme.transitions.duration.shorter,
    }),
}));

// ----------------------------------------------------------------------

NavbarAccount.propTypes = {
    isCollapse: PropTypes.bool,
};

export default function NavbarAccount({ isCollapse }) {
    const { data: user } = useUserInfo();

    return (
        <Link
            color="inherit"
            component={RouterLink}
            // to={PATH_DASHBOARD.user.profile}
            underline="none"
        >
            <RootStyle
                sx={{
                    ...(isCollapse && {
                        bgcolor: 'transparent',
                    }),
                }}
            >
                <MyAvatar />

                <Box
                    sx={{
                        ml: 1,
                        overflow: 'hidden',
                        transition: (theme) =>
                            theme.transitions.create('width', {
                                duration: theme.transitions.duration.shorter,
                            }),
                        ...(isCollapse && {
                            ml: 0,
                            width: 0,
                        }),
                    }}
                >
                    <Typography noWrap variant="subtitle2">
                        {user?.name?.displayName}
                    </Typography>
                    <Typography
                        noWrap
                        sx={{ color: 'text.secondary' }}
                        variant="body2"
                    >
                        Профиль{/* {user?.role?.name} */}
                    </Typography>
                </Box>
            </RootStyle>
        </Link>
    );
}
