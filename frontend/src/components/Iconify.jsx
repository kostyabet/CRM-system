// icons
import { Icon } from '@iconify/react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

// ----------------------------------------------------------------------

Iconify.propTypes = {
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    sx: PropTypes.object,
};

export default function Iconify({ icon, sx, ...other }) {
    return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}
