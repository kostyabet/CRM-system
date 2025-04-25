import { Box } from '@mui/material';
import { m } from 'framer-motion';
import PropTypes from 'prop-types';

//
import { varFade } from './variants';

// ----------------------------------------------------------------------

TextAnimate.propTypes = {
    sx: PropTypes.object,
    text: PropTypes.string.isRequired,
    variants: PropTypes.object,
};

export default function TextAnimate({ sx, text, variants, ...other }) {
    return (
        <Box
            component={m.h1}
            sx={{
                display: 'inline-flex',
                overflow: 'hidden',
                typography: 'h1',
                ...sx,
            }}
            {...other}
        >
            {text.split('').map((letter, index) => (
                <m.span key={index} variants={variants || varFade().inUp}>
                    {letter}
                </m.span>
            ))}
        </Box>
    );
}
