import { varAlpha } from '../../styles';

// ----------------------------------------------------------------------

const MuiPaper = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { elevation: 0 },

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: { backgroundImage: 'none' },
    outlined: ({ theme }) => ({
      borderColor: varAlpha(theme.palette.grey['500'], 0.16),
    }),
  },
};

// ----------------------------------------------------------------------

export const paper = { MuiPaper };
