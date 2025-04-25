import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

// ----------------------------------------------------------------------

SvgIconStyle.propTypes = {
    src: PropTypes.string.isRequired,
    sx: PropTypes.object,
};

export default function SvgIconStyle({ src, sx }) {
    return (
        <Box
            component="span"
            sx={{
                WebkitMask: `url(${src}) no-repeat center / contain`,
                bgcolor: 'currentColor',
                display: 'inline-block',
                height: 24,
                mask: `url(${src}) no-repeat center / contain`,
                width: 24,
                ...sx,
            }}
        />
    );
}
