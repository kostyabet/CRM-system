import { paper, varAlpha, stylesMode } from '../../styles';

// ----------------------------------------------------------------------

const MuiDrawer = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    paperAnchorRight: ({ ownerState, theme }) => ({
      ...(ownerState?.variant === 'temporary' && {
        ...paper({ theme }),
        boxShadow: `-40px 40px 80px -8px ${varAlpha(theme.palette.grey['500'], 0.24)}`,
        [stylesMode.dark]: {
          boxShadow: `-40px 40px 80px -8px ${varAlpha(theme.palette.common.black, 0.24)}`,
        },
      }),
    }),
    paperAnchorLeft: ({ ownerState, theme }) => ({
      ...(ownerState?.variant === 'temporary' && {
        ...paper({ theme }),
        boxShadow: `40px 40px 80px -8px ${varAlpha(theme.palette.grey['500'], 0.24)}`,
        [stylesMode.dark]: {
          boxShadow: `40px 40px 80px -8px  ${varAlpha(theme.palette.common.black, 0.24)}`,
        },
      }),
    }),
  },
};

// ----------------------------------------------------------------------

export const drawer = { MuiDrawer };
