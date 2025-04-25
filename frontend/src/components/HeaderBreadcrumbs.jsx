import { Box, Link, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

//
import Breadcrumbs from './Breadcrumbs';

// ----------------------------------------------------------------------

HeaderBreadcrumbs.propTypes = {
    action: PropTypes.node,
    heading: PropTypes.string.isRequired,
    links: PropTypes.array,
    moreLink: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    sx: PropTypes.object,
};

export default function HeaderBreadcrumbs({
    action,
    heading,
    links,
    moreLink = '' || [],
    sx,
    ...other
}) {
    return (
        <Box sx={{ mb: 5, ...sx }}>
            <Box
                sx={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap' }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h4">
                        {heading}
                    </Typography>
                    <Breadcrumbs links={links} {...other} />
                </Box>

                {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
            </Box>

            <Box sx={{ mt: 2 }}>
                {typeof moreLink === 'string' ? (
                    <Link
                        href={moreLink}
                        rel="noopener"
                        target="_blank"
                        variant="body2"
                    >
                        {moreLink}
                    </Link>
                ) : (
                    moreLink.map((href) => (
                        <Link
                            href={href}
                            key={href}
                            noWrap
                            rel="noopener"
                            sx={{ display: 'table' }}
                            target="_blank"
                            variant="body2"
                        >
                            {href}
                        </Link>
                    ))
                )}
            </Box>
        </Box>
    );
}
