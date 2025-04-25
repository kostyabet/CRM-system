import { Button, IconButton, Link, Stack, Tooltip } from '@mui/material';
import { alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';
//
import Iconify from './Iconify';

// ----------------------------------------------------------------------

SocialsButton.propTypes = {
    initialColor: PropTypes.bool,
    links: PropTypes.objectOf(PropTypes.string),
    simple: PropTypes.bool,
    sx: PropTypes.object,
};

export default function SocialsButton({
    initialColor = false,
    links = {},
    simple = true,
    sx,
    ...other
}) {
    const SOCIALS = [
        {
            icon: 'eva:facebook-fill',
            name: 'FaceBook',
            path: links.facebook || '#facebook-link',
            socialColor: '#1877F2',
        },
        {
            icon: 'ant-design:instagram-filled',
            name: 'Instagram',
            path: links.instagram || '#instagram-link',
            socialColor: '#E02D69',
        },
        {
            icon: 'eva:linkedin-fill',
            name: 'Linkedin',
            path: links.linkedin || '#linkedin-link',
            socialColor: '#007EBB',
        },
        {
            icon: 'eva:twitter-fill',
            name: 'Twitter',
            path: links.twitter || '#twitter-link',
            socialColor: '#00AAEC',
        },
    ];

    return (
        <Stack alignItems="center" direction="row" flexWrap="wrap">
            {SOCIALS.map((social) => {
                const { icon, name, path, socialColor } = social;
                return simple ? (
                    <Link href={path} key={name}>
                        <Tooltip placement="top" title={name}>
                            <IconButton
                                color="inherit"
                                sx={{
                                    ...(initialColor && {
                                        '&:hover': {
                                            bgcolor: alpha(socialColor, 0.08),
                                        },
                                        color: socialColor,
                                    }),
                                    ...sx,
                                }}
                                {...other}
                            >
                                <Iconify
                                    icon={icon}
                                    sx={{ height: 20, width: 20 }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Link>
                ) : (
                    <Button
                        color="inherit"
                        href={path}
                        key={name}
                        size="small"
                        startIcon={<Iconify icon={icon} />}
                        sx={{
                            flexShrink: 0,
                            m: 0.5,
                            ...(initialColor && {
                                '&:hover': {
                                    bgcolor: alpha(socialColor, 0.08),
                                    borderColor: socialColor,
                                },
                                borderColor: socialColor,
                                color: socialColor,
                            }),
                            ...sx,
                        }}
                        variant="outlined"
                        {...other}
                    >
                        {name}
                    </Button>
                );
            })}
        </Stack>
    );
}
