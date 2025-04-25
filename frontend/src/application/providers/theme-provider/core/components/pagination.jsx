import { paginationItemClasses } from '@mui/material/PaginationItem';

import { varAlpha, stylesMode } from '../../styles';

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];

// ----------------------------------------------------------------------

const softVariant = {
  colors: COLORS.map((color) => ({
    props: ({ ownerState }) =>
      !ownerState?.disabled && ownerState?.variant === 'soft' && ownerState?.color === color,
    style: ({ theme }) => ({
      [`& .${paginationItemClasses.root}`]: {
        [`&.${paginationItemClasses.selected}`]: {
          fontWeight: theme.typography.fontWeightSemiBold,
          color: theme.palette[color].dark,
          backgroundColor: varAlpha(theme.palette[color].main, 0.08),
          '&:hover': { backgroundColor: varAlpha(theme.palette[color].main, 0.16) },
          [stylesMode.dark]: { color: theme.palette[color].light },
        },
      },
    }),
  })),
  standardColor: [
    {
      props: ({ ownerState }) => ownerState?.variant === 'soft' && ownerState?.color === 'standard',
      style: ({ theme }) => ({
        [`& .${paginationItemClasses.root}`]: {
          [`&.${paginationItemClasses.selected}`]: {
            fontWeight: theme.typography.fontWeightSemiBold,
            backgroundColor: varAlpha(theme.palette.grey['500'], 0.08),
            '&:hover': { backgroundColor: varAlpha(theme.palette.grey['500'], 0.16) },
          },
        },
      }),
    },
  ],
};

// ----------------------------------------------------------------------

const MuiPagination = {
  /** **************************************
   * VARIANTS
   *************************************** */
  variants: [
    /**
     * @variant soft
     */
    ...[...softVariant.standardColor, ...softVariant.colors],
  ],

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    /**
     * @variant text
     */
    text: ({ ownerState, theme }) => ({
      [`& .${paginationItemClasses.root}`]: {
        [`&.${paginationItemClasses.selected}`]: {
          fontWeight: theme.typography.fontWeightSemiBold,
          ...(ownerState?.color === 'standard' && {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.text.primary,
            '&:hover': { backgroundColor: theme.palette.grey[700] },
            [stylesMode.dark]: {
              color: theme.palette.grey[800],
              '&:hover': { backgroundColor: theme.palette.grey[100] },
            },
          }),
        },
      },
    }),
    /**
     * @variant outlined
     */
    outlined: ({ ownerState, theme }) => ({
      [`& .${paginationItemClasses.root}`]: {
        borderColor: varAlpha(theme.palette.grey['500'], 0.24),
        [`&.${paginationItemClasses.selected}`]: {
          borderColor: 'currentColor',
          fontWeight: theme.typography.fontWeightSemiBold,
          ...(ownerState?.color === 'standard' && {
            backgroundColor: varAlpha(theme.palette.grey['500'], 0.08),
          }),
        },
      },
    }),
  },
};

// ----------------------------------------------------------------------

export const pagination = { MuiPagination };
