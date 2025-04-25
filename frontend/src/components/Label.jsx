import { Box } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ ownerState, theme }) => {
    const isLight = theme.palette.mode === 'light';
    const { color, variant } = ownerState;

    const styleFilled = (color) => ({
        backgroundColor: theme.palette[color].main,
        color: theme.palette[color].contrastText,
    });

    const styleOutlined = (color) => ({
        backgroundColor: 'transparent',
        border: `1px solid ${theme.palette[color].main}`,
        color: theme.palette[color].main,
    });

    const styleGhost = (color) => ({
        backgroundColor: alpha(theme.palette[color].main, 0.16),
        color: theme.palette[color][isLight ? 'dark' : 'light'],
    });

    return {
        alignItems: 'center',
        backgroundColor: theme.palette.grey[300],
        borderRadius: 6,
        color: theme.palette.grey[800],
        cursor: 'default',
        display: 'inline-flex',
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.pxToRem(12),
        fontWeight: theme.typography.fontWeightBold,
        height: 22,
        justifyContent: 'center',
        lineHeight: 0,
        minWidth: 22,
        padding: theme.spacing(0, 1),
        whiteSpace: 'nowrap',

        ...(color !== 'default'
            ? {
                  ...(variant === 'filled' && { ...styleFilled(color) }),
                  ...(variant === 'outlined' && { ...styleOutlined(color) }),
                  ...(variant === 'ghost' && { ...styleGhost(color) }),
              }
            : {
                  ...(variant === 'outlined' && {
                      backgroundColor: 'transparent',
                      border: `1px solid ${theme.palette.grey[500_32]}`,
                      color: theme.palette.text.primary,
                  }),
                  ...(variant === 'ghost' && {
                      backgroundColor: theme.palette.grey[500_16],
                      color: isLight
                          ? theme.palette.text.secondary
                          : theme.palette.common.white,
                  }),
              }),
    };
});

// ----------------------------------------------------------------------

Label.propTypes = {
    children: PropTypes.node,
    color: PropTypes.oneOf([
        'default',
        'primary',
        'secondary',
        'info',
        'success',
        'warning',
        'error',
    ]),
    endIcon: PropTypes.node,
    startIcon: PropTypes.node,
    sx: PropTypes.object,
    variant: PropTypes.oneOf(['filled', 'outlined', 'ghost']),
};

export default function Label({
    children,
    color = 'default',
    endIcon,
    startIcon,
    sx,
    variant = 'ghost',
}) {
    const style = {
        '& svg, img': { height: 1, objectFit: 'cover', width: 1 },
        height: 16,
        width: 16,
    };

    return (
        <RootStyle
            ownerState={{ color, variant }}
            sx={{
                ...(startIcon && { pl: 0.75 }),
                ...(endIcon && { pr: 0.75 }),
                ...sx,
            }}
        >
            {startIcon && <Box sx={{ mr: 0.75, ...style }}>{startIcon}</Box>}

            {children}

            {endIcon && <Box sx={{ ml: 0.75, ...style }}>{endIcon}</Box>}
        </RootStyle>
    );
}
