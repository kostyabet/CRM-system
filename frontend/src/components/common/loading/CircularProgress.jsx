import { Box } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';

import Logo from './../../Logo';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
    alignItems: 'center',
    bottom: 0,
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    position: 'fixed',
    right: 0,
    width: '100%',
    zIndex: 0,
    // backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

LoadingScreen.propTypes = {
    isDashboard: PropTypes.bool,
};

export default function LoadingScreen({ ...other }) {
    return (
        <RootStyle {...other}>
            <m.div
                animate={{
                    opacity: [1, 0.48, 0.48, 1, 1],
                    scale: [1, 0.9, 0.9, 1, 1],
                }}
                transition={{
                    duration: 2,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatDelay: 1,
                }}
            >
                <Logo
                    disabledLink
                    sx={{
                        height: 38,
                        transform: 'translate(10px, 10px)',
                        width: 75
                    }}
                />
            </m.div>

            <Box
                animate={{
                    borderRadius: ['25%', '25%', '50%', '50%', '25%'],
                    opacity: [0.25, 1, 1, 1, 0.25],
                    rotate: [270, 0, 0, 270, 270],
                    scale: [1.2, 1, 1, 1.2, 1.2],
                }}
                component={m.div}
                sx={{
                    border: (theme) =>
                        `solid 3px ${alpha(theme.palette.primary.dark, 0.24)}`,
                    borderRadius: '25%',
                    height: 100,
                    position: 'absolute',
                    width: 100,
                }}
                transition={{ duration: 3.2, ease: 'linear', repeat: Infinity }}
            />

            <Box
                animate={{
                    borderRadius: ['25%', '25%', '50%', '50%', '25%'],
                    opacity: [1, 0.25, 0.25, 0.25, 1],
                    rotate: [0, 270, 270, 0, 0],
                    scale: [1, 1.2, 1.2, 1, 1],
                }}
                component={m.div}
                sx={{
                    border: (theme) =>
                        `solid 8px ${alpha(theme.palette.primary.dark, 0.24)}`,
                    borderRadius: '25%',
                    height: 120,
                    position: 'absolute',
                    width: 120,
                }}
                transition={{
                    duration: 3.2,
                    ease: 'linear',
                    repeat: Infinity,
                }}
            />
        </RootStyle>
    );
}
