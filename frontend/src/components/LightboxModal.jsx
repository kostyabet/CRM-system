import { GlobalStyles, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Lightbox from 'react-image-lightbox';

// ----------------------------------------------------------------------

function LightboxModalStyles() {
    const theme = useTheme();
    const isRTL = theme.direction === 'rtl';

    const ICON_SIZE = 32;
    const ICON_COLOR = theme.palette.grey[600].replace('#', '');

    const getIcon = (icon) =>
        `url(https://api.iconify.design/carbon/${icon}.svg?color=%23${ICON_COLOR}&width=${ICON_SIZE}&height=${ICON_SIZE})`;

    const Icon = (icon) => ({
        '&:before': {
            content: getIcon(icon),
            display: 'block',
            height: ICON_SIZE,
            width: ICON_SIZE,
        },
        '&:hover': {
            opacity: 0.72,
        },
        alignItems: 'center',
        backgroundColor: 'transparent',
        backgroundImage: `unset`,
        display: 'inline-flex',
        justifyContent: 'center',
        opacity: 1,
        transition: theme.transitions.create('opacity'),
    });

    return (
        <GlobalStyles
            styles={{
                '& .ReactModalPortal': {
                    '& .ril__navButtons': {
                        '&.ril__navButtonNext': {
                            left: 'auto',
                            right: theme.spacing(2),
                            ...Icon(isRTL ? 'arrow-left' : 'arrow-right'),
                        },
                        '&.ril__navButtonPrev': {
                            left: theme.spacing(2),
                            right: 'auto',
                            ...Icon(isRTL ? 'arrow-right' : 'arrow-left'),
                        },
                        padding: theme.spacing(3),
                    },

                    '& .ril__outer': {
                        backgroundColor: alpha(theme.palette.grey[900], 0.96),
                    },
                    // Toolbar
                    '& .ril__toolbar': {
                        backgroundColor: 'transparent',
                        height: 'auto !important',
                        padding: theme.spacing(2, 3),
                    },
                    '& .ril__toolbarLeftSide': { display: 'none' },

                    '& .ril__toolbarRightSide': {
                        '& li': {
                            alignItems: 'center',
                            display: 'flex',
                        },
                        '& li:first-of-type': {
                            flexGrow: 1,
                        },
                        '& li:not(:first-of-type)': {
                            height: 40,
                            justifyContent: 'center',
                            marginLeft: theme.spacing(2),
                            width: 40,
                        },
                        alignItems: 'center',
                        display: 'flex',
                        flexGrow: 1,
                        height: 'auto !important',
                        padding: 0,
                    },
                    '& .ril__toolbarRightSide button': {
                        '&.ril__closeButton': Icon('close'),
                        '&.ril__zoomInButton': Icon('zoom-in'),
                        '&.ril__zoomOutButton': Icon('zoom-out'),
                        height: '100%',
                        width: '100%',
                    },
                    // Button
                    '& button:focus': { outline: 'none' },
                },
            }}
        />
    );
}

// ----------------------------------------------------------------------

LightboxModal.propTypes = {
    images: PropTypes.array.isRequired,
    isOpen: PropTypes.bool,
    photoIndex: PropTypes.number,
    setPhotoIndex: PropTypes.func,
};

export default function LightboxModal({
    images,
    isOpen,
    photoIndex,
    setPhotoIndex,
    ...other
}) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    const showIndex = (
        <Typography variant="subtitle2">{`${photoIndex + 1} / ${
            images.length
        }`}</Typography>
    );

    const toolbarButtons = [showIndex];

    const customStyles = {
        overlay: {
            zIndex: 9999,
        },
    };

    return (
        <>
            <LightboxModalStyles />

            {isOpen && (
                <Lightbox
                    animationDuration={160}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex + 1) % images.length)
                    }
                    onMovePrevRequest={() =>
                        setPhotoIndex(
                            (photoIndex + images.length - 1) % images.length,
                        )
                    }
                    prevSrc={
                        images[(photoIndex + images.length - 1) % images.length]
                    }
                    reactModalStyle={customStyles}
                    toolbarButtons={toolbarButtons}
                    {...other}
                />
            )}
        </>
    );
}
