import { Box, Collapse, GlobalStyles } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';

//
import Iconify from '~/components/Iconify';
import { IconButtonAnimate } from '~/components/animate';
import useSettings from '~/shared/hooks/useSettings';

// ----------------------------------------------------------------------

function SnackbarStyles() {
    const theme = useTheme();

    const isLight = theme.palette.mode === 'light';

    return (
        <GlobalStyles
            styles={{
                '#root': {
                    '& .SnackbarContent-root': {
                        '&.SnackbarItem-variantSuccess, &.SnackbarItem-variantError, &.SnackbarItem-variantWarning, &.SnackbarItem-variantInfo':
                            {
                                backgroundColor: theme.palette.background.paper,
                                color: theme.palette.text.primary,
                            },
                        backgroundColor: theme.palette.grey[isLight ? 900 : 0],
                        borderRadius: theme.shape.borderRadius,
                        boxShadow: theme.customShadows.z8,
                        color: theme.palette.grey[isLight ? 0 : 800],
                        margin: theme.spacing(0.25, 0),
                        padding: theme.spacing(1),
                        [theme.breakpoints.up('md')]: {
                            minWidth: 240,
                        },
                        width: '100%',
                    },
                    '& .SnackbarItem-action': {
                        '& svg': { height: 20, width: 20 },
                        color: theme.palette.action.active,
                        marginRight: 0,
                    },
                    '& .SnackbarItem-message': {
                        fontWeight: theme.typography.fontWeightMedium,
                        padding: '0 !important',
                    },
                },
            }}
        />
    );
}

// ----------------------------------------------------------------------

NotistackProvider.propTypes = {
    children: PropTypes.node,
};

export function NotistackProvider({ children }) {
    const { themeDirection } = useSettings();

    const isRTL = themeDirection === 'rtl';

    const notistackRef = useRef(null);

    const onClose = (key) => () => {
        notistackRef.current.closeSnackbar(key);
    };

    return (
        <>
            <SnackbarStyles />

            <SnackbarProvider
                TransitionComponent={isRTL ? Collapse : undefined}
                // With close as default
                action={(key) => (
                    <IconButtonAnimate
                        onClick={onClose(key)}
                        size="small"
                        sx={{ p: 0.5 }}
                    >
                        <Iconify icon={'eva:close-fill'} />
                    </IconButtonAnimate>
                )}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                autoHideDuration={3000}
                dense
                iconVariant={{
                    error: (
                        <SnackbarIcon
                            color="error"
                            icon={'eva:alert-circle-fill'}
                        />
                    ),
                    info: <SnackbarIcon color="info" icon={'eva:info-fill'} />,
                    success: (
                        <SnackbarIcon
                            color="success"
                            icon={'eva:checkmark-circle-2-fill'}
                        />
                    ),
                    warning: (
                        <SnackbarIcon
                            color="warning"
                            icon={'eva:alert-triangle-fill'}
                        />
                    ),
                }}
                maxSnack={5}
                preventDuplicate
                ref={notistackRef}
                variant="success" // Set default variant
            >
                {children}
            </SnackbarProvider>
        </>
    );
}

// ----------------------------------------------------------------------

SnackbarIcon.propTypes = {
    color: PropTypes.oneOf([
        'primary',
        'secondary',
        'info',
        'success',
        'warning',
        'error',
    ]),
    icon: PropTypes.string,
};

function SnackbarIcon({ color, icon }) {
    return (
        <Box
            component="span"
            sx={{
                alignItems: 'center',
                bgcolor: (theme) => alpha(theme.palette[color].main, 0.16),
                borderRadius: 1.5,
                color: `${color}.main`,
                display: 'flex',
                height: 40,
                justifyContent: 'center',
                mr: 1.5,
                width: 40,
            }}
        >
            <Iconify height={24} icon={icon} width={24} />
        </Box>
    );
}
