import { Box, Button, Card, IconButton, TextField } from '@mui/material';
import { useRef } from 'react';

import Iconify from './../../../../components/Iconify';

// ----------------------------------------------------------------------

export default function ProfilePostInput() {
    const fileInputRef = useRef(null);

    const handleAttach = () => {
        fileInputRef.current?.click();
    };

    return (
        <Card sx={{ p: 3 }}>
            <TextField
                fullWidth
                multiline
                placeholder="Share what you are thinking here..."
                rows={4}
                sx={{
                    '& fieldset': {
                        borderColor: (theme) =>
                            `${theme.palette.grey[500_32]} !important`,
                        borderWidth: `1px !important`,
                    },
                }}
            />

            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 3,
                }}
            >
                <Box sx={{ display: 'flex' }}>
                    <IconButton
                        onClick={handleAttach}
                        size="small"
                        sx={{ mr: 1 }}
                    >
                        <Iconify
                            height={24}
                            icon={'ic:round-add-photo-alternate'}
                            width={24}
                        />
                    </IconButton>
                    <IconButton onClick={handleAttach} size="small">
                        <Iconify
                            height={24}
                            icon={'eva:attach-2-fill'}
                            width={24}
                        />
                    </IconButton>
                </Box>
                <Button variant="contained">Post</Button>
            </Box>

            <input ref={fileInputRef} style={{ display: 'none' }} type="file" />
        </Card>
    );
}
