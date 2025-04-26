import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Image from './../../../../components/Image';
import ProfileAvatar from './../../../../components/ProfileAvatar';
import { userFullName } from './../../../../shared/utils/auxiliaryFn';
import cssStyles from './../../../../shared/utils/cssStyles';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    '&:before': {
        ...cssStyles().bgBlur({
            blur: 0.5,
            color: theme.palette.primary.darker,
        }),
        content: "''",
        height: '100%',
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 9,
    },
}));

const InfoStyle = styled('div')(({ theme }) => ({
    left: 0,
    marginTop: theme.spacing(5),
    position: 'absolute',
    right: 0,
    [theme.breakpoints.up('md')]: {
        alignItems: 'center',
        bottom: theme.spacing(3),
        display: 'flex',
        left: theme.spacing(3),
        right: 'auto',
    },
    zIndex: 99,
}));

// ----------------------------------------------------------------------

ProfileCover.propTypes = {
    myProfile: PropTypes.object,
};

export default function ProfileCover({ user }) {
    const { firstName, role } = user;

    return (
        <RootStyle>
            <InfoStyle>
                <ProfileAvatar
                    sx={{
                        borderColor: 'common.white',
                        borderStyle: 'solid',
                        borderWidth: 2,
                        height: { md: 128, xs: 80 },
                        mx: 'auto',
                        width: { md: 128, xs: 80 },
                    }}
                    userNameFields={firstName}
                />
                <Box
                    sx={{
                        color: 'common.white',
                        ml: { md: 3 },
                        mt: { md: 0, xs: 1 },
                        textAlign: { md: 'left', xs: 'center' },
                    }}
                >
                    <Typography variant="h4">{userFullName(user)}</Typography>
                    <Typography sx={{ opacity: 0.72 }}>{role}</Typography>
                </Box>
            </InfoStyle>
            <Image
                alt="profile cover"
                src={'/assets/phone.jpg'}
                sx={{
                    bottom: 0,
                    left: 0,
                    position: 'absolute',
                    right: 0,
                    top: 0,
                }}
            />
        </RootStyle>
    );
}
