import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import React from 'react';

// ----------------------------------------------------------------------

Image.propTypes = {
    disabledEffect: PropTypes.bool,
    effect: PropTypes.string,
    ratio: PropTypes.oneOf([
        '4/3',
        '3/4',
        '6/4',
        '4/6',
        '16/9',
        '9/16',
        '21/9',
        '9/21',
        '1/1',
    ]),
    sx: PropTypes.object,
};

export default function Image({
    disabledEffect = false,
    effect = 'blur',
    ratio,
    sx,
    ...other
}) {
    if (ratio) {
        return (
            <Box
                component="span"
                sx={{
                    '& .wrapper': {
                        backgroundSize: 'cover !important',
                        bottom: 0,
                        left: 0,
                        lineHeight: 0,
                        position: 'absolute',
                        right: 0,
                        top: 0,
                    },
                    display: 'block',
                    lineHeight: 0,
                    overflow: 'hidden',
                    position: 'relative',
                    pt: getRatio(ratio),
                    width: 1,
                    ...sx,
                }}
            >
                <Box
                    component={LazyLoadImage}
                    effect={disabledEffect ? undefined : effect}
                    placeholderSrc="/assets/placeholder.svg"
                    sx={{ height: 1, objectFit: 'cover', width: 1 }}
                    wrapperClassName="wrapper"
                    {...other}
                />
            </Box>
        );
    }

    return (
        <Box
            component="span"
            sx={{
                '& .wrapper': {
                    backgroundSize: 'cover !important',
                    height: 1,
                    width: 1,
                },
                display: 'block',
                lineHeight: 0,
                overflow: 'hidden',
                ...sx,
            }}
        >
            <Box
                component={LazyLoadImage}
                effect={disabledEffect ? undefined : effect}
                placeholderSrc="/assets/placeholder.svg"
                sx={{ height: 1, objectFit: 'cover', width: 1 }}
                wrapperClassName="wrapper"
                {...other}
            />
        </Box>
    );
}

// ----------------------------------------------------------------------

function getRatio(ratio = '1/1') {
    return {
        '1/1': '100%',
        '3/4': 'calc(100% / 3 * 4)',
        '4/3': 'calc(100% / 4 * 3)',
        '4/6': 'calc(100% / 4 * 6)',
        '6/4': 'calc(100% / 6 * 4)',
        '9/16': 'calc(100% / 9 * 16)',
        '9/21': 'calc(100% / 9 * 21)',
        '16/9': 'calc(100% / 16 * 9)',
        '21/9': 'calc(100% / 21 * 9)',
    }[ratio];
}
