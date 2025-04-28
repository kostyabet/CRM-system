import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';
import React from 'react';

import COLORS from './../../../application/providers/theme-provider/core/colors';
import { paper, varAlpha } from './../../../application/providers/theme-provider/styles';
import PRIMARY_COLOR from './../../../application/providers/theme-provider/with-settings/primary-color.json';
import Scrollbar from './../../../components/Scrollbar';
import Iconify from './../../../components/Iconify';
import { defaultFont } from '~/application/providers/theme-provider/core/typography';

import { FontSizeOption } from './fontsize-option';
import { BaseOption } from './base-option';
import { NavOptions } from './nav-options';
import { useSettingsContext } from '../context';
import { PresetsOptions } from './presets-options';
import { FullScreenButton } from './fullscreen-button';
import { FontOptions } from './font-options';
import ToggleButton from '../ToggleButton';

// ----------------------------------------------------------------------

export function SettingsDrawer({
  sx,
  hideFontSize,
  hideFont,
  hideCompact,
  hidePresets,
  hideNavColor,
  hideContrast,
  hideNavLayout,
  hideDirection,
  hideColorScheme,
}) {
  const theme = useTheme();

  const settings = useSettingsContext();

  const renderHead = (
    <Box display="flex" alignItems="center" sx={{ py: 2, pr: 1, pl: 2.5 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Settings
      </Typography>

      <FullScreenButton />

      <Tooltip title="Reset">
        <IconButton
          onClick={() => {
            settings.onReset();
            
          }}
        >
          <Badge color="error" variant="dot" invisible={!settings.canReset}>
            <Iconify icon="solar:restart-bold" />
          </Badge>
        </IconButton>
      </Tooltip>

      <Tooltip title="Close">
        <IconButton onClick={settings.onCloseDrawer}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const renderMode = (
    <BaseOption
      label="Dark mode"
      icon="moon"
      selected={settings.colorScheme === 'dark'}
      onClick={() => {
        settings.onUpdateField('colorScheme', settings.colorScheme === 'light' ? 'dark' : 'light');
        
      }}
    />
  );

  const renderContrast = (
    <BaseOption
      label="Contrast"
      icon="contrast"
      selected={settings.contrast === 'hight'}
      onClick={() =>
        settings.onUpdateField('contrast', settings.contrast === 'default' ? 'hight' : 'default')
      }
    />
  );

  const renderRTL = (
    <BaseOption
      label="Right to left"
      icon="align-right"
      selected={settings.themeDirection === 'rtl'}
      onClick={() =>
        settings.onUpdateField('themeDirection', settings.themeDirection === 'ltr' ? 'rtl' : 'ltr')
      }
    />
  );

  const renderCompact = (
    <BaseOption
      tooltip="Dashboard only and available at large resolutions > 1600px (xl)"
      label="Compact"
      icon="autofit-width"
      selected={!settings.themeStretch}
      onClick={() => settings.onUpdateField('themeStretch', !settings.themeStretch)}
    />
  );

  const renderPresets = (
    <PresetsOptions
      value={settings.primaryColor}
      onClickOption={(newValue) => settings.onUpdateField('primaryColor', newValue)}
      options={[
        { name: 'default', value: COLORS.primary.main },
        { name: 'cyan', value: PRIMARY_COLOR.cyan.main },
        { name: 'purple', value: PRIMARY_COLOR.purple.main },
        { name: 'blue', value: PRIMARY_COLOR.blue.main },
        { name: 'orange', value: PRIMARY_COLOR.orange.main },
        { name: 'red', value: PRIMARY_COLOR.red.main },
      ]}
    />
  );

  const renderNav = (
    <NavOptions
      value={{
        color: settings.navColor,
        layout: settings.themeLayout,
      }}
      onClickOption={{
        color: (newValue) => settings.onUpdateField('navColor', newValue),
        layout: (newValue) => settings.onUpdateField('themeLayout', newValue),
      }}
      options={{
        layouts: ['vertical', 'horizontal'],
        colors: []
      }}
      hideNavColor={true}
      hideNavLayout={hideNavLayout}
    />
  );

  const renderFont = (
    <FontOptions
      value={settings.fontFamily}
      onClickOption={(newValue) => settings.onUpdateField('fontFamily', newValue)}
      options={[defaultFont, 'Inter', 'DM Sans', 'Nunito Sans']}
    />
  );

  const renderFontSize = (
    <FontSizeOption
      onChangeOption={(value) => settings.onUpdateField('fontSize', value)}
      minOption={4}
      maxOption={28}
      step={2}
      currentValue={settings.fontSize}
    />
  );

  return (
    <>
        <ToggleButton
            onToggle={settings.onToggleDrawer}
            open={settings.openDrawer}
        />
      <Drawer
        anchor="right"
        open={settings.openDrawer}
        onClose={settings.onCloseDrawer}
        slotProps={{ backdrop: { invisible: true } }}
        sx={{
          [`& .${drawerClasses.paper}`]: {
            ...paper({
              theme,
              color: varAlpha(theme.palette.background.default, 0.9),
            }),
            width: 360,
            ...sx,
          },
        }}
      >
        {renderHead}

        <Scrollbar>
          <Stack spacing={6} sx={{ px: 2.5, pb: 5 }}>
            <Box gap={2} display="grid" gridTemplateColumns="repeat(2, 1fr)">
              {!hideColorScheme && renderMode}
              {!hideContrast && renderContrast}
              {!hideDirection && renderRTL}
              {!hideCompact && renderCompact}
            </Box>
            {!(hideNavLayout && hideNavColor) && renderNav}
            {!hidePresets && renderPresets}
            {!hideFont && renderFont}
            {!hideFontSize && renderFontSize}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
    
  );
}
