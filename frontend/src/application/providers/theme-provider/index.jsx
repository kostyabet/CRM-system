import { CssBaseline } from '@mui/material';
import {
    ThemeProvider as MUIThemeProvider,
    StyledEngineProvider,
    createTheme,
} from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import { setFont } from './styles/utils';
import breakpoints from './breakpoints';
import {components} from './core/components';

import palette from './core/palette';
import { shadows } from './core/shadows';
import { typography } from './core/typography'; 
import { customShadows } from './core/custom-shadows';
import { useSettingsContext } from './../../../widgets/theme-settings/context/use-settings-context';
import { updateCoreWithSettings } from './with-settings/update-theme';

ThemeProvider.propTypes = {
    children: PropTypes.node,
};

export function ThemeProvider({ children }) {
    const settings = useSettingsContext();

    const isLight = settings.colorScheme === 'light';

    const themeOptions = useMemo(
        () => ({
            breakpoints,
            customShadows: customShadows(settings.colorScheme),
            direction: settings.themeDirection,
            palette: isLight ? palette.light : palette.dark,
            shadows: isLight ? shadows.light : shadows.dark,
            shape: { borderRadius: 8 },
            typography: {
              ...typography,
              fontFamily: setFont(settings.fontFamily),
            },
        }),
        [settings],
    );

    const theme = createTheme(themeOptions);

    const updatedTheme = updateCoreWithSettings(theme, settings)
    updatedTheme.components = components;

    return (
        <StyledEngineProvider injectFirst>
            <MUIThemeProvider theme={updatedTheme}>
                <CssBaseline />
                {children}
        {/* //         <RTL direction={settings.themeDirection}>
        //             {children}
        //         </RTL> */}
            </MUIThemeProvider>
        </StyledEngineProvider>
    );
}