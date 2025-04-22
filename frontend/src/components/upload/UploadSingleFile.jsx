import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

//
import Image from '../Image';
import BlockContent from './BlockContent';
import RejectionFiles from './RejectionFiles';

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
    '&:hover': { cursor: 'pointer', opacity: 0.72 },
    backgroundColor: theme.palette.background.neutral,
    border: `1px dashed ${theme.palette.grey[500_32]}`,
    borderRadius: theme.shape.borderRadius,
    outline: 'none',
    overflow: 'hidden',
    padding: theme.spacing(5, 1),
    position: 'relative',
    transition: theme.transitions.create('padding'),
}));

// ----------------------------------------------------------------------

UploadSingleFile.propTypes = {
    error: PropTypes.bool,
    file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    helperText: PropTypes.node,
    sx: PropTypes.object,
};

export default function UploadSingleFile({
    error = false,
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
        <Box sx={{ width: '100%', ...sx }}>
            <DropZoneStyle
                {...getRootProps()}
                sx={{
                    ...(isDragActive && { opacity: 0.72 }),
                    ...((isDragReject || error) && {
                        bgcolor: 'error.lighter',
                        borderColor: 'error.light',
                        color: 'error.main',
                    }),
                    ...(file && {
                        padding: '12% 0',
                    }),
                }}
            >
                <input {...getInputProps()} />

                <BlockContent />

                {file && (
                    <Image
                        alt="file preview"
                        src={typeof file === 'string' ? file : file.preview}
                        sx={{
                            borderRadius: 1,
                            height: 'calc(100% - 16px)',
                            left: 8,
                            position: 'absolute',
                            top: 8,
                            width: 'calc(100% - 16px)',
                        }}
                    />
                )}
            </DropZoneStyle>

            {fileRejections.length > 0 && (
                <RejectionFiles fileRejections={fileRejections} />
            )}

            {helperText && helperText}
        </Box>
    );
}
