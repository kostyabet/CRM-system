import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Iconify from './../../../../components/Iconify';
import Image from './../../../../components/Image';
import LightboxModal from './../../../../components/LightboxModal';
import cssStyles from './../../../../shared/utils/cssStyles';
import { fDate } from './../../../../shared/utils/formatTime';

// ----------------------------------------------------------------------

const CaptionStyle = styled(CardContent)(({ theme }) => ({
    ...cssStyles().bgBlur({ blur: 2, color: theme.palette.grey[900] }),
    alignItems: 'center',
    bottom: 0,
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
}));

// ----------------------------------------------------------------------

ProfileGallery.propTypes = {
    gallery: PropTypes.array.isRequired,
};

export default function ProfileGallery({ gallery }) {
    const [openLightbox, setOpenLightbox] = useState(false);

    const [selectedImage, setSelectedImage] = useState(0);

    const imagesLightbox = gallery.map((img) => img.imageUrl);

    const handleOpenLightbox = (url) => {
        const selectedImage = imagesLightbox.findIndex(
            (index) => index === url,
        );
        setOpenLightbox(true);
        setSelectedImage(selectedImage);
    };
    return (
        <Box sx={{ mt: 5 }}>
            <Typography sx={{ mb: 3 }} variant="h4">
                Gallery
            </Typography>

            <Card sx={{ p: 3 }}>
                <Box
                    sx={{
                        display: 'grid',
                        gap: 3,
                        gridTemplateColumns: {
                            md: 'repeat(3, 1fr)',
                            sm: 'repeat(2, 1fr)',
                            xs: 'repeat(1, 1fr)',
                        },
                    }}
                >
                    {gallery.map((image) => (
                        <GalleryItem
                            image={image}
                            key={image.id}
                            onOpenLightbox={handleOpenLightbox}
                        />
                    ))}
                </Box>

                <LightboxModal
                    images={imagesLightbox}
                    isOpen={openLightbox}
                    mainSrc={imagesLightbox[selectedImage]}
                    onCloseRequest={() => setOpenLightbox(false)}
                    photoIndex={selectedImage}
                    setPhotoIndex={setSelectedImage}
                />
            </Card>
        </Box>
    );
}

// ----------------------------------------------------------------------

GalleryItem.propTypes = {
    image: PropTypes.object,
    onOpenLightbox: PropTypes.func,
};

function GalleryItem({ image, onOpenLightbox }) {
    const { imageUrl, postAt, title } = image;
    return (
        <Card sx={{ cursor: 'pointer', position: 'relative' }}>
            <Image
                alt="gallery image"
                onClick={() => onOpenLightbox(imageUrl)}
                ratio="1/1"
                src={imageUrl}
            />

            <CaptionStyle>
                <div>
                    <Typography variant="subtitle1">{title}</Typography>
                    <Typography sx={{ opacity: 0.72 }} variant="body2">
                        {fDate(postAt)}
                    </Typography>
                </div>
                <IconButton color="inherit">
                    <Iconify
                        height={20}
                        icon={'eva:more-vertical-fill'}
                        width={20}
                    />
                </IconButton>
            </CaptionStyle>
        </Card>
    );
}
