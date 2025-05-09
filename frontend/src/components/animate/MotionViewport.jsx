import { Box } from '@mui/material';
import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import useResponsive from '~/shared/hooks/useResponsive';

import { varContainer } from '.';
//

// ----------------------------------------------------------------------

MotionViewport.propTypes = {
    children: PropTypes.node.isRequired,
    disableAnimatedMobile: PropTypes.bool,
};

export default function MotionViewport({
    children,
    disableAnimatedMobile = true,
    ...other
}) {
    const isDesktop = useResponsive('up', 'sm');

    if (!isDesktop && disableAnimatedMobile) {
        return <Box {...other}>{children}</Box>;
    }

    return (
        <Box
            component={m.div}
            initial="initial"
            variants={varContainer()}
            viewport={{ amount: 0.3, once: true }}
            whileInView="animate"
            {...other}
        >
            {children}
        </Box>
    );
}
