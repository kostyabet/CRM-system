import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import ButtonBase from '@mui/material/ButtonBase';
import React from 'react';

import { varAlpha, stylesMode } from './../../../application/providers/theme-provider/styles';
import Iconify from './../../../components/Iconify';

// ----------------------------------------------------------------------

export function Block({ title, tooltip, children, sx }) {
  return (
    <Box
      sx={{
        px: 2,
        pb: 2,
        pt: 4,
        borderRadius: 2,
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        border: (theme) => `solid 1px ${varAlpha(theme.palette.grey['500'], 0.12)}`,
        
        ...sx,
      }}
    >
      <Box
        component="span"
        sx={{
          px: 1.25,
          top: -12,
          fontSize: 13,
          borderRadius: 22,
          lineHeight: '22px',
          position: 'absolute',
          alignItems: 'center',
          bgcolor: 'background.default',
          display: 'inline-flex',
          color: 'text.primary',
          fontWeight: 'fontWeightSemiBold',
          [stylesMode.dark]: { color: 'grey.800' },
        }}
      >
        {title}

        {tooltip && (
          <Tooltip title={tooltip} placement="right">
            <Iconify
              width={14}
              icon="eva:info-outline"
              sx={{ ml: 0.5, mr: -0.5, opacity: 0.48, cursor: 'pointer' }}
            />
          </Tooltip>
        )}
      </Box>

      {children}
    </Box>
  );
}

// ----------------------------------------------------------------------

export function BlockOption({ icon, label, selected, sx, ...other }) {
  return (
    <ButtonBase
      disableRipple
      sx={{
        '--border-color': (theme) => varAlpha(theme.palette.grey['500'], 0.08),
        '--active-color': (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
        width: 1,
        borderRadius: 1.5,
        lineHeight: '18px',
        color: 'text.disabled',
        border: `solid 1px transparent`,
        fontWeight: 'fontWeightSemiBold',
        fontSize: (theme) => theme.typography.pxToRem(13),
        ...(selected && {
          color: 'text.primary',
          bgcolor: 'background.paper',
          borderColor: 'var(--border-color)',
          boxShadow: (theme) =>
            `-8px 8px 20px -4px ${varAlpha(theme.palette.grey['500'], 0.12)}`,
          [stylesMode.dark]: {
            boxShadow: (theme) =>
              `-8px 8px 20px -4px ${varAlpha(theme.palette.common.black, 0.12)}`,
          },
          [`& .mnl__svg__color__root`]: {
            background: 'var(--active-color)',
          },
        }),
        ...sx,
      }}
      {...other}
    >
      {icon && icon}
      {label && label}
    </ButtonBase>
  );
}
