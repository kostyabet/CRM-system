import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { useUserInfo } from './../../../../entities/user';
// assets
import { DocIllustration } from './../../../../shared/assets';
import useLocales from './../../../../shared/hooks/useLocales';

import { PATH_DOCS } from '../../../router/paths';

// ----------------------------------------------------------------------

export default function NavbarDocs() {
    const { data: user } = useUserInfo();

    const { translate } = useLocales();

    return (
        <Stack
            spacing={3}
            sx={{
                display: 'block',
                mt: 10,
                pb: 5,
                px: 5,
                textAlign: 'center',
                width: 1,
            }}
        >
            <DocIllustration sx={{ width: 1 }} />

            <div>
                <Typography gutterBottom variant="subtitle1">
                    {translate('docs.hi')}, {user?.firstName}
                </Typography>
                <Typography
                    sx={{ color: 'text.secondary', whiteSpace: 'pre-line' }}
                    variant="body2"
                >
                    {translate('docs.description')}
                </Typography>
            </div>

            <Button
                href={PATH_DOCS}
                rel="noopener"
                target="_blank"
                variant="contained"
            >
                {translate('docs.documentation')}
            </Button>
        </Stack>
    );
}
