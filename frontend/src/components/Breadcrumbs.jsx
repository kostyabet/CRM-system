import {
    Box,
    Link,
    Breadcrumbs as MUIBreadcrumbs,
    Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';

// ----------------------------------------------------------------------

Breadcrumbs.propTypes = {
    activeLast: PropTypes.bool,
    links: PropTypes.array.isRequired,
};

export default function Breadcrumbs({ activeLast = false, links, ...other }) {
    const currentLink = links[links.length - 1].name;

    const listDefault = links.map((link) => (
        <LinkItem key={link.name} link={link} />
    ));

    const listActiveLast = links.map((link) => (
        <div key={link.name}>
            {link.name !== currentLink ? (
                <LinkItem link={link} />
            ) : (
                <Typography
                    sx={{
                        color: 'text.disabled',
                        maxWidth: 260,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                    variant="body2"
                >
                    {currentLink}
                </Typography>
            )}
        </div>
    ));

    return (
        <MUIBreadcrumbs
            separator={
                <Box
                    component="span"
                    sx={{
                        bgcolor: 'text.disabled',
                        borderRadius: '50%',
                        height: 4,
                        width: 4,
                    }}
                />
            }
            {...other}
        >
            {activeLast ? listDefault : listActiveLast}
        </MUIBreadcrumbs>
    );
}

// ----------------------------------------------------------------------

LinkItem.propTypes = {
    link: PropTypes.shape({
        href: PropTypes.string,
        icon: PropTypes.any,
        name: PropTypes.string,
    }),
};

function LinkItem({ link }) {
    const { href, icon, name } = link;
    return (
        <Link
            component={RouterLink}
            key={name}
            sx={{
                '& > div': { display: 'inherit' },
                alignItems: 'center',
                color: 'text.primary',
                display: 'flex',
                lineHeight: 2,
            }}
            to={href || '#'}
            variant="body2"
        >
            {icon && (
                <Box sx={{ '& svg': { height: 20, width: 20 }, mr: 1 }}>
                    {icon}
                </Box>
            )}
            {name}
        </Link>
    );
}
