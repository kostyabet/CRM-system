import { Box, Fab } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// ----------------------------------------------------------------------

const FabButtonAnimate = forwardRef(
    (
        { children, color = 'primary', size = 'large', sx, sxWrap, ...other },
        ref,
    ) => {
        const theme = useTheme();

        if (
            color === 'default' ||
            color === 'inherit' ||
            color === 'primary' ||
            color === 'secondary'
        ) {
            return (
                <AnimateWrap size={size} sxWrap={sxWrap}>
                    <Fab color={color} ref={ref} size={size} sx={sx} {...other}>
                        {children}
                    </Fab>
                </AnimateWrap>
            );
        }

        return (
            <AnimateWrap size={size} sxWrap={sxWrap}>
                <Fab
                    ref={ref}
                    size={size}
                    sx={{
                        '&:hover': {
                            bgcolor: theme.palette[color].dark,
                        },
                        bgcolor: theme.palette[color].main,
                        boxShadow: theme.customShadows[color],
                        color: theme.palette[color].contrastText,
                        ...sx,
                    }}
                    {...other}
                >
                    {children}
                </Fab>
            </AnimateWrap>
        );
    },
);

FabButtonAnimate.propTypes = {
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
    sx: PropTypes.object,
    sxWrap: PropTypes.object,
};

export default FabButtonAnimate;

// ----------------------------------------------------------------------

const varSmall = {
    hover: { scale: 1.07 },
    tap: { scale: 0.97 },
};

const varMedium = {
    hover: { scale: 1.06 },
    tap: { scale: 0.98 },
};

const varLarge = {
    hover: { scale: 1.05 },
    tap: { scale: 0.99 },
};

AnimateWrap.propTypes = {
    children: PropTypes.node.isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    sxWrap: PropTypes.object,
};

function AnimateWrap({ children, size, sxWrap }) {
    const isSmall = size === 'small';
    const isLarge = size === 'large';

    return (
        <Box
            component={m.div}
            sx={{
                display: 'inline-flex',
                ...sxWrap,
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
