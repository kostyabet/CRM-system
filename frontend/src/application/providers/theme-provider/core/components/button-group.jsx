import { buttonGroupClasses } from '@mui/material/ButtonGroup';

import { varAlpha, stylesMode } from '../../styles';

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

const buttonClasses = `& .${buttonGroupClasses.firstButton}, & .${buttonGroupClasses.middleButton}`;

const softVariant = {
  colors: COLORS.map((color) => ({
    props: ({ ownerState }) =>
      !ownerState?.disabled && ownerState?.variant === 'soft' && ownerState?.color === color,
    style: ({ theme }) => ({
      [buttonClasses]: {
        borderColor: varAlpha(theme.palette[color].dark, 0.24),
        [stylesMode.dark]: { borderColor: varAlpha(theme.palette[color].light, 0.24) },
      },
      [`&.${buttonGroupClasses.vertical}`]: {
        [buttonClasses]: {
          borderColor: varAlpha(theme.palette[color].dark, 0.24),
          [stylesMode.dark]: {
            borderColor: varAlpha(theme.palette[color].light, 0.24),
          },
        },
      },
    }),
  })),
  base: [
    {
      props: ({ ownerState }) => ownerState?.variant === 'soft',
      style: ({ theme }) => ({
        [buttonClasses]: {
          borderRight: `solid 1px ${varAlpha(theme.palette.grey['500'])}`,
          [`&.${buttonGroupClasses.disabled}`]: {
            borderColor: theme.palette.action.disabledBackground,
          },
        },
        [`&.${buttonGroupClasses.vertical}`]: {
          [buttonClasses]: {
            borderRight: 'none',
            borderBottom: `solid 1px ${varAlpha(theme.palette.grey['500'], 0.32)}`,
            [`&.${buttonGroupClasses.disabled}`]: {
              borderColor: theme.palette.action.disabledBackground,
            },
          },
        },
      }),
    },
  ],
};

// ----------------------------------------------------------------------

const MuiButtonGroup = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { disableElevation: true },

  /** **************************************
   * VARIANTS
   *************************************** */
  variants: [
    /**
     * @variant soft
     */
    ...[...softVariant.base, ...softVariant.colors],
  ],

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    /**
     * @variant contained
     */
    contained: ({ theme, ownerState }) => {
      const styled = {
        colors: styleColors(ownerState, (color) => ({
          [buttonClasses]: { borderColor: varAlpha(theme.palette[color].dark, 0.48) },
        })),
        inheritColor: {
          ...(ownerState?.color === 'inherit' && {
            [buttonClasses]: { borderColor: varAlpha(theme.palette.grey['500'], 0.32) },
          }),
        },
        disabled: {
          ...(ownerState?.disabled && {
            [buttonClasses]: {
              [`&.${buttonGroupClasses.disabled}`]: {
                borderColor: theme.palette.action.disabledBackground,
              },
            },
          }),
        },
      };

      return { ...styled.inheritColor, ...styled.colors, ...styled.disabled };
    },
    /**
     * @variant text
     */
    text: ({ theme, ownerState }) => {
      const styled = {
        colors: styleColors(ownerState, (color) => ({
          [buttonClasses]: { borderColor: varAlpha(theme.palette[color].main, 0.48) },
        })),
        inheritColor: {
          ...(ownerState?.color === 'inherit' && {
            [buttonClasses]: { borderColor: varAlpha(theme.palette.grey['500'], 0.32) },
          }),
        },
        disabled: {
          ...(ownerState?.disabled && {
            [buttonClasses]: {
              [`&.${buttonGroupClasses.disabled}`]: {
                borderColor: theme.palette.action.disabledBackground,
              },
            },
          }),
        },
      };

      return { ...styled.inheritColor, ...styled.colors, ...styled.disabled };
    },
  },
};

// ----------------------------------------------------------------------

export const buttonGroup = { MuiButtonGroup };
