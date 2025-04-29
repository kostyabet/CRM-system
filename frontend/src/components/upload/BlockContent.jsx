import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

// assets
import { UploadIllustration } from './../../shared/assets';

// ----------------------------------------------------------------------

export default function BlockContent({req}) {
    return (
        <Stack
            alignItems="center"
            direction={{ md: 'row', xs: 'column' }}
            justifyContent="center"
            spacing={2}
            sx={{ textAlign: { md: 'left', xs: 'center' }, width: 1 }}
        >
            <UploadIllustration sx={{ width: 220 }} />

            <Box sx={{ p: 3 }}>
                <Typography gutterBottom variant="h5">
                    Перетащите или выберете файл
                </Typography>

                <Typography sx={{ color: 'text.secondary' }} variant="body2">
                    Перетащите выбранные файлы сюда или нажмите&nbsp;
                    <Typography
                        component="span"
                        sx={{
                            color: 'primary.main',
                            textDecoration: 'underline',
                        }}
                        variant="body2"
                    >
                        поиск
                    </Typography>
                    &nbsp;на вашем устройстве
                </Typography>
                
                <Typography sx={{ color: 'text.secondary' }} variant="body2">
                   {req}
                </Typography>
            </Box>
        </Stack>
    );
}
