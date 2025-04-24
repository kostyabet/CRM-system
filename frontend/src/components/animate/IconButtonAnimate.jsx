import { Box, IconButton } from '@mui/material';
import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import React from 'react';

// ----------------------------------------------------------------------

const IconButtonAnimate = forwardRef(
    ({ children, size = 'medium', ...other }, ref) => (
        <AnimateWrap size={size}>
            <IconButton ref={ref} size={size} {...other}>
                {children}
            </IconButton>
        </AnimateWrap>
    ),
);

IconButtonAnimate.propTypes = {
    children: PropTypes.node.isRequired,
    color: PropTypes.oneOf([
        'inherit',
        'default',
        'primary',
        'secondary',
        'info',
        'success',
        'warning',
        'error',
    ]),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default IconButtonAnimate;

// ----------------------------------------------------------------------

const varSmall = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
};

const varMedium = {
    hover: { scale: 1.09 },
    tap: { scale: 0.97 },
};

const varLarge = {
    hover: { scale: 1.08 },
    tap: { scale: 0.99 },
};

AnimateWrap.propTypes = {
    children: PropTypes.node.isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
};

function AnimateWrap({ children, size }) {
    const isSmall = size === 'small';
    const isLarge = size === 'large';

    return (
        <Box
            component={m.div}
            sx={{
                display: 'inline-flex',
            }}
            variants={
                (isSmall && varSmall) || (isLarge && varLarge) || varMedium
            }
            whileHover="hover"
            whileTap="tap"
        >
            {children}
        </Box>
    );
}
