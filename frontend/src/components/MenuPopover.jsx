import { Popover } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';

// ----------------------------------------------------------------------

const ArrowStyle = styled('span')(({ arrow, theme }) => {
    const SIZE = 12;

    const POSITION = -(SIZE / 2);

    const borderStyle = `solid 1px ${theme.palette.grey[500_12]}`;

    const topStyle = {
        borderBottom: borderStyle,
        borderRadius: '0 0 3px 0',
        borderRight: borderStyle,
        top: POSITION,
    };
    const bottomStyle = {
        borderLeft: borderStyle,
        borderRadius: '3px 0 0 0',
        borderTop: borderStyle,
        bottom: POSITION,
    };
    const leftStyle = {
        borderRadius: '0 3px 0 0',
        borderRight: borderStyle,
        borderTop: borderStyle,
        left: POSITION,
    };
    const rightStyle = {
        borderBottom: borderStyle,
        borderLeft: borderStyle,
        borderRadius: '0 0 0 3px',
        right: POSITION,
    };

    return {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            background: theme.palette.background.paper,
            content: "''",
            display: 'block',
            height: SIZE,
            position: 'absolute',
            transform: 'rotate(-135deg)',
            width: SIZE,
            zIndex: 1,
        },
        // Top
        ...(arrow === 'top-left' && { ...topStyle, left: 20 }),
        ...(arrow === 'top-center' && {
            ...topStyle,
            left: 0,
            margin: 'auto',
            right: 0,
        }),
        ...(arrow === 'top-right' && { ...topStyle, right: 20 }),
        // Bottom
        ...(arrow === 'bottom-left' && { ...bottomStyle, left: 20 }),
        ...(arrow === 'bottom-center' && {
            ...bottomStyle,
            left: 0,
            margin: 'auto',
            right: 0,
        }),
        ...(arrow === 'bottom-right' && { ...bottomStyle, right: 20 }),
        // Left
        ...(arrow === 'left-top' && { ...leftStyle, top: 20 }),
        ...(arrow === 'left-center' && {
            ...leftStyle,
            bottom: 0,
            margin: 'auto',
            top: 0,
        }),
        ...(arrow === 'left-bottom' && { ...leftStyle, bottom: 20 }),
        // Right
        ...(arrow === 'right-top' && { ...rightStyle, top: 20 }),
        ...(arrow === 'right-center' && {
            ...rightStyle,
            bottom: 0,
            margin: 'auto',
            top: 0,
        }),
        ...(arrow === 'right-bottom' && { ...rightStyle, bottom: 20 }),
    };
});

// ----------------------------------------------------------------------

MenuPopover.propTypes = {
    arrow: PropTypes.oneOf([
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
        'left-top',
        'left-center',
        'left-bottom',
        'right-top',
        'right-center',
        'right-bottom',
    ]),
    children: PropTypes.node,
    disabledArrow: PropTypes.bool,
    sx: PropTypes.object,
};
export default function MenuPopover({
    arrow = 'top-right',
    children,
    disabledArrow,
    sx,
    ...other
}) {
    return (
        <Popover
            PaperProps={{
                sx: {
                    overflow: 'inherit',
                    p: 1,
                    width: 200,
                    ...sx,
                },
            }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            {...other}
        >
            {!disabledArrow && <ArrowStyle arrow={arrow} />}

            {children}
        </Popover>
    );
}
