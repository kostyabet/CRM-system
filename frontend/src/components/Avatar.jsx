import { Avatar as MUIAvatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

// ----------------------------------------------------------------------

const Avatar = forwardRef(
    ({ children, color = 'default', sx, ...other }, ref) => {
        const theme = useTheme();

        if (color === 'default') {
            return (
                <MUIAvatar ref={ref} sx={sx} {...other}>
                    {children}
                </MUIAvatar>
            );
        }

        return (
            <MUIAvatar
                ref={ref}
                sx={{
                    backgroundColor: theme.palette[color].lighter,
                    color: theme.palette[color].dark,
                    fontWeight: theme.typography.fontWeightMedium,
                    overflow: 'hidden',
                    ...sx,
                }}
                {...other}
            >
                {children}
            </MUIAvatar>
        );
    },
);

Avatar.propTypes = {
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
    sx: PropTypes.object,
};

export default Avatar;
