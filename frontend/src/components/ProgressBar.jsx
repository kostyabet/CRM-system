import { GlobalStyles } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import NProgress from 'nprogress';
import React, { useEffect, useMemo } from 'react';

// ----------------------------------------------------------------------

export function ProgressBarStyle() {
    const theme = useTheme();

    return (
        <GlobalStyles
            styles={{
                '#nprogress': {
                    '& .bar': {
                        backgroundColor: theme.palette.primary.main,
                        boxShadow: `0 0 2px ${theme.palette.primary.main}`,
                        height: 2,
                        left: 0,
                        position: 'fixed',
                        top: 0,
                        width: '100%',
                        zIndex: theme.zIndex.snackbar,
                    },
                    '& .peg': {
                        boxShadow: `0 0 10px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.primary.main}`,
                        display: 'block',
                        height: '100%',
                        opacity: 1,
                        position: 'absolute',
                        right: 0,
                        transform: 'rotate(3deg) translate(0px, -4px)',
                        width: 100,
                    },
                    pointerEvents: 'none',
                },
            }}
        />
    );
}

export default function ProgressBar() {
    NProgress.configure({
        showSpinner: false,
    });

    useMemo(() => {
        NProgress.start();
    }, []);

    useEffect(() => {
        NProgress.done();
    }, []);

    return null;
}
