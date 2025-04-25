import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet-async';

const Page = forwardRef(({ children, meta = null, title = '', ...other }, ref) => (
    <>
        <Helmet>
            <title>{`${title}`}</title>
            {meta}
        </Helmet>

        <Box ref={ref} {...other}>
            {children}
        </Box>
    </>
));

Page.propTypes = {
    children: PropTypes.node.isRequired,
    meta: PropTypes.node,
    title: PropTypes.string,
};

export default Page;
