import { toggleButtonClasses } from '@mui/material/ToggleButton';

import { varAlpha } from '../../styles';

// ----------------------------------------------------------------------

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];

function styleColors(ownerState, styles) {
  const outputStyle = COLORS.reduce((acc, color) => {
    if (!ownerState?.disabled && ownerState?.color === color) {
      acc = styles(color);
    }
    return acc;
  }, {});

  return outputStyle;
}

// ----------------------------------------------------------------------

const MuiToggleButton = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme, ownerState }) => {
      const styled = {
        colors: styleColors(ownerState, (color) => ({
          '&:hover': {
            borderColor: varAlpha(theme.palette[color].main, 0.48),
            backgroundColor: varAlpha(
              theme.palette[color].main,
              theme.palette.action.hoverOpacity
            ),
          },
        })),
        selected: {
          [`&.${toggleButtonClasses.selected}`]: {
            borderColor: 'currentColor',
            boxShadow: '0 0 0 0.75px currentColor',
          },
        },
        disabled: {
          ...(ownerState?.disabled && {
            [`&.${toggleButtonClasses.selected}`]: {
              color: theme.palette.action.disabled,
              backgroundColor: theme.palette.action.selected,
              borderColor: theme.palette.action.disabledBackground,
            },
          }),
        },
      };

      return { ...styled.colors, ...styled.selected, ...styled.disabled };
    },
  },
};

// ----------------------------------------------------------------------

const MuiToggleButtonGroup = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      gap: 4,
      padding: 4,
      border: `solid 1px ${varAlpha(theme.palette.grey['500'], 0.08)}`,
    }),
    grouped: {
      [`&.${toggleButtonClasses.root}`]: { border: 'none', borderRadius: 'inherit' },
      [`&.${toggleButtonClasses.selected}`]: { boxShadow: 'none' },
    },
  },
};

// ----------------------------------------------------------------------

export const toggleButton = { MuiToggleButton, MuiToggleButtonGroup };
