import { Box, Button } from '@mui/material';

import Iconify from '../Iconify';
import React from 'react';

const ActionButton = ({
    icon = 'plus',
    justifyContent = 'flex-end',
    name,
    ...other
}) => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: { justifyContent },
        }}
    >
        <Button
            startIcon={<Iconify icon={`eva:${icon}-fill`} />}
            variant="contained"
            {...other}
        >
            {name}
        </Button>
    </Box>
);

export default ActionButton;
