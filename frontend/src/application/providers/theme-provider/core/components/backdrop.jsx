import { varAlpha } from '../../styles';

// ----------------------------------------------------------------------

const MuiBackdrop = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: varAlpha(theme.palette.grey['800'], 0.48),
    }),
    invisible: { background: 'transparent' },
  },
};

// ----------------------------------------------------------------------

export const backdrop = { MuiBackdrop };
