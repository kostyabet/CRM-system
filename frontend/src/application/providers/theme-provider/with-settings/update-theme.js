import COLORS from '../core/colors.json';
import PRIMARY_COLOR from './primary-color.json';
import { components as coreComponents } from '../core/components';
import { hexToRgbChannel, createPaletteChannel } from '../styles';
import { primary as corePrimary, grey as coreGreyPalette } from '../core/palette';
import { createShadowColor, customShadows as coreCustomShadows } from '../core/';

// ----------------------------------------------------------------------

const PRIMARY_COLORS = {
  default: COLORS.primary,
  cyan: PRIMARY_COLOR.cyan,
  purple: PRIMARY_COLOR.purple,
  blue: PRIMARY_COLOR.blue,
  orange: PRIMARY_COLOR.orange,
  red: PRIMARY_COLOR.red,
};

// ----------------------------------------------------------------------

/**
 * [1] settings @primaryColor
 * [2] settings @contrast
 */

export function updateCoreWithSettings(theme, settings) {
  const { customShadows } = theme;

  const updatedPrimary = getPalette(
    settings.primaryColor,
    corePrimary,
    PRIMARY_COLORS[settings.primaryColor]
  );

  console.log(settings.contrast)

  return {
    ...theme,
    palette: {
      ...theme.palette,
      primary: updatedPrimary,
      ...(
        settings.colorScheme == "light" && {
          ...theme.palette.background,
            default: getBackgroundDefault(settings.contrast),
            defaultChannel: hexToRgbChannel(getBackgroundDefault(settings.contrast)),
        }
      )
    },
    customShadows: {
      ...customShadows,
      /** [1] */
      primary:
        settings.primaryColor === 'default'
          ? coreCustomShadows('light').primary
          : createShadowColor(updatedPrimary.main),
    },
  };
}

// ----------------------------------------------------------------------

export function updateComponentsWithSettings(settings) {

          
  /** [2] */
  if (settings.contrast === 'hight') {
    const MuiCard = {
      styleOverrides: {
        root: ({ theme, ownerState }) => {
          
          let rootStyles = {};
          if (typeof coreComponents?.MuiCard?.styleOverrides?.root === 'function') {
            rootStyles =
              coreComponents.MuiCard.styleOverrides.root({
                ownerState,
                theme,
              }) ?? {};
          }

          

          return {
            ...rootStyles,
            boxShadow: theme.customShadows.z1,
          };
        },
      },
    };

    components.MuiCard = MuiCard;
  }
  console.log('lllllllll')

  return { components };
}

// ----------------------------------------------------------------------

function getPalette(name, initialPalette, updatedPalette) {
  /** [1] */
  console.log(name, initialPalette, updatedPalette)
  return name === 'default' ? initialPalette : createPaletteChannel(updatedPalette);
}

function getBackgroundDefault(contrast) {
  /** [2] */
  console.log(coreGreyPalette[200])
  return contrast === 'default' ? '#FFFFFF' : coreGreyPalette[200];
}
