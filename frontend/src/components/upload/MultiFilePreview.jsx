import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { AnimatePresence, m } from 'framer-motion';
import PropTypes from 'prop-types';

import { fData } from '~/shared/utils/formatNumber';
import getFileData from '~/shared/utils/getFileData';

import Iconify from '../Iconify';
//
import Image from '../Image';
import { varFade } from '../animate';
import React from 'react';

// ----------------------------------------------------------------------

MultiFilePreview.propTypes = {
    files: PropTypes.array.isRequired,
    onRemove: PropTypes.func,
    showPreview: PropTypes.bool,
};

export default function MultiFilePreview({
    files,
    onRemove,
    showPreview = false,
}) {
    const hasFile = files.length > 0;

    return (
        <List disablePadding sx={{ ...(hasFile && { my: 3 }) }}>
            <AnimatePresence>
                {files.map((file, index) => {
                    const { key, name, preview, size } = getFileData(
                        file,
                        index,
                    );

                    if (showPreview) {
                        return (
                            <ListItem
                                component={m.div}
                                key={key}
                                {...varFade().inRight}
                                sx={{
                                    border: (theme) =>
                                        `solid 1px ${theme.palette.divider}`,
                                    borderRadius: 1.25,
                                    display: 'inline-flex',
                                    height: 80,
                                    m: 0.5,
                                    overflow: 'hidden',
                                    p: 0,
                                    position: 'relative',
                                    width: 80,
                                }}
                            >
                                <Image
                                    alt="preview"
                                    ratio="1/1"
                                    src={preview}
                                />

                                {onRemove && (
                                    <IconButton
                                        onClick={() => onRemove(file)}
                                        size="small"
                                        sx={{
                                            '&:hover': {
                                                bgcolor: (theme) =>
                                                    alpha(
                                                        theme.palette.grey[900],
                                                        0.48,
                                                    ),
                                            },
                                            bgcolor: (theme) =>
                                                alpha(
                                                    theme.palette.grey[900],
                                                    0.72,
                                                ),
                                            color: 'common.white',
                                            p: '2px',
                                            position: 'absolute',
                                            right: 6,
                                            top: 6,
                                        }}
                                    >
                                        <Iconify icon={'eva:close-fill'} />
                                    </IconButton>
                                )}
                            </ListItem>
                        );
                    }

                    return (
                        <ListItem
                            component={m.div}
                            key={key}
                            sx={{
                                border: (theme) =>
                                    `solid 1px ${theme.palette.divider}`,
                                borderRadius: 0.75,
                                my: 1,
                                px: 2,
                                py: 0.75,
                            }}
                        >
                            <Iconify
                                icon={'eva:file-fill'}
                                sx={{
                                    color: 'text.secondary',
                                    height: 28,
                                    mr: 2,
                                    width: 28,
                                }}
                            />

                            <ListItemText
                                primary={typeof file === 'string' ? file : name}
                                primaryTypographyProps={{
                                    variant: 'subtitle2',
                                }}
                                secondary={
                                    typeof file === 'string'
                                        ? ''
                                        : fData(size || 0)
                                }
                                secondaryTypographyProps={{
                                    variant: 'caption',
                                }}
                            />

                            {onRemove && (
                                <IconButton
                                    edge="end"
                                    onClick={() => onRemove(file)}
                                    size="small"
                                >
                                    <Iconify icon={'eva:close-fill'} />
                                </IconButton>
                            )}
                        </ListItem>
                    );
                })}
            </AnimatePresence>
        </List>
    );
}
