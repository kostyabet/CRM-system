import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

import Iconify from '../Iconify';
//
import Image from '../Image';
import RejectionFiles from './RejectionFiles';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    border: `1px dashed ${theme.palette.grey[500_32]}`,
    borderRadius: '50%',
    height: 144,
    margin: 'auto',
    padding: theme.spacing(1),
    width: 144,
}));

const DropZoneStyle = styled('div')({
    '& > *': { height: '100%', width: '100%' },
    '&:hover': {
        '& .placeholder': {
            zIndex: 9,
        },
        cursor: 'pointer',
    },
    alignItems: 'center',
    borderRadius: '50%',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    outline: 'none',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    zIndex: 0,
});

const PlaceholderStyle = styled('div')(({ theme }) => ({
    '&:hover': { opacity: 0.72 },
    alignItems: 'center',
    backgroundColor: theme.palette.background.neutral,
    color: theme.palette.text.secondary,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
    transition: theme.transitions.create('opacity', {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeInOut,
    }),
}));

// ----------------------------------------------------------------------

UploadAvatar.propTypes = {
    error: PropTypes.bool,
    file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    helperText: PropTypes.node,
    sx: PropTypes.object,
};

export default function UploadAvatar({
    error,
    file,
    helperText,
    sx,
    ...other
}) {
    const {
        fileRejections,
        getInputProps,
        getRootProps,
        isDragActive,
        isDragReject,
    } = useDropzone({
        multiple: false,
        ...other,
    });

    return (
        <>
            <RootStyle
                sx={{
                    ...((isDragReject || error) && {
                        borderColor: 'error.light',
                    }),
                    ...sx,
                }}
            >
                <DropZoneStyle
                    {...getRootProps()}
                    sx={{
                        ...(isDragActive && { opacity: 0.72 }),
                    }}
                >
                    <input {...getInputProps()} />

                    {file && (
                        <Image
                            alt="avatar"
                            src={typeof file === 'string' ? file : file.preview}
                            sx={{ zIndex: 8 }}
                        />
                    )}

                    <PlaceholderStyle
                        className="placeholder"
                        sx={{
                            ...(file && {
                                '&:hover': { opacity: 0.72 },
                                bgcolor: 'grey.900',
                                color: 'common.white',
                                opacity: 0,
                            }),
                            ...((isDragReject || error) && {
                                bgcolor: 'error.lighter',
                            }),
                        }}
                    >
                        <Iconify
                            icon={'ic:round-add-a-photo'}
                            sx={{ height: 24, mb: 1, width: 24 }}
                        />
                        <Typography variant="caption">
                            {file ? 'Update photo' : 'Upload photo'}
                        </Typography>
                    </PlaceholderStyle>
                </DropZoneStyle>
            </RootStyle>

            {helperText && helperText}

            {fileRejections.length > 0 && (
                <RejectionFiles fileRejections={fileRejections} />
            )}
        </>
    );
}
