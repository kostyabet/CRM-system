import { Box, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

//
import BlockContent from './BlockContent';
import MultiFilePreview from './MultiFilePreview';
import RejectionFiles from './RejectionFiles';

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
    '&:hover': { cursor: 'pointer', opacity: 0.72 },
    backgroundColor: theme.palette.background.neutral,
    border: `1px dashed ${theme.palette.grey[500_32]}`,
    borderRadius: theme.shape.borderRadius,
    outline: 'none',
    padding: theme.spacing(5, 1),
}));

// ----------------------------------------------------------------------

UploadMultiFile.propTypes = {
    error: PropTypes.bool,
    files: PropTypes.array.isRequired,
    helperText: PropTypes.node,
    onRemove: PropTypes.func,
    onRemoveAll: PropTypes.func,
    onUpload: PropTypes.func,
    showPreview: PropTypes.bool,
    accept: PropTypes.string,
    sx: PropTypes.object,
    req: PropTypes.string,
};

export default function UploadMultiFile({
    error,
    files,
    helperText,
    onRemove,
    onRemoveAll,
    onUpload,
    req,
    showPreview = false,
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
        maxSize: 150 * 1024 * 1024,
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
                }}
            >
                <input {...getInputProps()} />
                <BlockContent req={req} />
            </DropZoneStyle>

            {fileRejections.length > 0 && (
                <RejectionFiles fileRejections={fileRejections} />
            )}

            <MultiFilePreview
                files={files}
                onRemove={onRemove}
                showPreview={showPreview}
            />

            {files.length > 0 && (
                <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                    <Button color="inherit" onClick={onRemoveAll} size="small">
                        Отменить все
                    </Button>
                    <Button onClick={onUpload} size="small" variant="contained">
                        Загрузить
                    </Button>
                </Stack>
            )}

            {helperText && helperText}
        </Box>
    );
}
