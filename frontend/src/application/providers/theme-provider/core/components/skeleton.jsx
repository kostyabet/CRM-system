import { varAlpha } from '../../styles';

// ----------------------------------------------------------------------

const MuiSkeleton = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { animation: 'wave', variant: 'rounded' },

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: varAlpha(theme.palette.grey['400'], 0.12),
    }),
    rounded: ({ theme }) => ({ borderRadius: theme.shape.borderRadius * 2 }),
  },
};

// ----------------------------------------------------------------------

export const skeleton = { MuiSkeleton };
