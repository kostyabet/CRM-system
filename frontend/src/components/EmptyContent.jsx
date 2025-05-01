import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';

//
import Image from './Image';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    padding: theme.spacing(8, 2),
    textAlign: 'center',
}));

// ----------------------------------------------------------------------

EmptyContent.propTypes = {
    description: PropTypes.string,
    img: PropTypes.string,
    title: PropTypes.string.isRequired,
};

export default function EmptyContent({ description, img, title, ...other }) {
    return (
        <RootStyle {...other}>
            <Image
                alt="empty content"
                disabledEffect
                src={
                    img ||
                    '/assets/illustrations/illustration_empty_content.svg'
                }
                sx={{ height: 240, mb: 3 }}
                visibleByDefault
            />

            <Typography gutterBottom variant="h5">
                {title}
            </Typography>

            {description && (
                <Typography sx={{ color: 'text.secondary' }} variant="body2">
                    {description}
                </Typography>
            )}
        </RootStyle>
    );
}
