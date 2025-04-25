import { Box } from '@mui/material';
import { m } from 'framer-motion';
import PropTypes from 'prop-types';

//
import { varContainer } from './variants';

// ----------------------------------------------------------------------

MotionContainer.propTypes = {
    action: PropTypes.bool,
    animate: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

export default function MotionContainer({
    action = false,
    animate,
    children,
    ...other
}) {
    if (action) {
        return (
            <Box
                animate={animate ? 'animate' : 'exit'}
                component={m.div}
                initial={false}
                variants={varContainer()}
                {...other}
            >
                {children}
            </Box>
        );
    }

    return (
        <Box
            animate="animate"
            component={m.div}
            exit="exit"
            initial="initial"
            variants={varContainer()}
            {...other}
        >
            {children}
        </Box>
    );
}
