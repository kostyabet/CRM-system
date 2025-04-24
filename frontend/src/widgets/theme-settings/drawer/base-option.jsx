import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import ButtonBase from '@mui/material/ButtonBase';
import React from 'react';

import { varAlpha } from './../../../application/providers/theme-provider/styles';

import Iconify from './../../../components/Iconify';
import SvgColor from './../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

export function BaseOption({ icon, label, tooltip, selected, ...other }) {
  return (
    <ButtonBase
      disableRipple
      sx={{
        px: 2,
        py: 2.5,
        borderRadius: 2,
        cursor: 'pointer',
        flexDirection: 'column',
        alignItems: 'flex-start',
        border: (theme) => `solid 1px ${varAlpha(theme.palette.grey['500'], 0.12)}`,
        '&:hover': {
          bgcolor: (theme) => varAlpha(theme.palette.grey['500'], 0.08),
        },
        ...(selected && {
          bgcolor: (theme) => varAlpha(theme.palette.grey['500'], 0.08),
        }),
      }}
      {...other}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: 1, mb: 3 }}
      >
        <SvgColor src={`/assets/icons/settings/ic-${icon}.svg`} />
        <Switch name={label} size="small" color="default" checked={selected} sx={{ mr: -0.75 }} />
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ width: 1 }}>
        <Box
          component="span"
          sx={{
            lineHeight: '18px',
            fontWeight: 'fontWeightSemiBold',
            fontSize: (theme) => theme.typography.pxToRem(13),
          }}
        >
          {label}
        </Box>

        {tooltip && (
          <Tooltip
            arrow
            title={tooltip}
            slotProps={{
              tooltip: { sx: { maxWidth: 240, mr: 0.5 } },
            }}
          >
            <Iconify
              width={16}
              icon="eva:info-outline"
              sx={{ cursor: 'pointer', color: 'text.disabled' }}
            />
          </Tooltip>
        )}
      </Box>
    </ButtonBase>
  );
}
