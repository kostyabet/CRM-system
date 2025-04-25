import { Box, Paper, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';

import { fData } from '~/shared/utils/formatNumber';
import getFileData from '~/shared/utils/getFileData';

// ----------------------------------------------------------------------

RejectionFiles.propTypes = {
    fileRejections: PropTypes.array.isRequired,
};

export default function RejectionFiles({ fileRejections }) {
    return (
        <Paper
            sx={{
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
                borderColor: 'error.light',
                mt: 3,
                px: 2,
                py: 1,
            }}
            variant="outlined"
        >
            {fileRejections.map(({ errors, file }) => {
                const { path, size } = getFileData(file);

                return (
                    <Box key={path} sx={{ my: 1 }}>
                        <Typography noWrap variant="subtitle2">
                            {path} - {size ? fData(size) : ''}
                        </Typography>

                        {errors.map((error) => (
                            <Box
                                component="li"
                                key={error.code}
                                sx={{ typography: 'caption' }}
                            >
                                {error.message}
                            </Box>
                        ))}
                    </Box>
                );
            })}
        </Paper>
    );
}
