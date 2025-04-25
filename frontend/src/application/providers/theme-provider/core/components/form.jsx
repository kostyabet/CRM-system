import { inputLabelClasses } from '@mui/material/InputLabel';

// ----------------------------------------------------------------------

const MuiFormLabel = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography.body2,
      color: theme.palette.text.disabled,
      [`&.${inputLabelClasses.shrink}`]: {
        ...theme.typography.body1,
        fontWeight: 600,
        color: theme.palette.text.secondary,
        [`&.${inputLabelClasses.focused}`]: { color: theme.palette.text.primary },
        [`&.${inputLabelClasses.error}`]: { color: theme.palette.error.main },
        [`&.${inputLabelClasses.disabled}`]: { color: theme.palette.text.disabled },
        [`&.${inputLabelClasses.filled}`]: { transform: 'translate(12px, 6px) scale(0.75)' },
      },
    }),
  },
};

// ----------------------------------------------------------------------

const MuiFormHelperText = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { component: 'div' },

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: { root: ({ theme }) => ({ marginTop: theme.spacing(1) }) },
};

// ----------------------------------------------------------------------

const MuiFormControlLabel = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: { label: ({ theme }) => ({ ...theme.typography.body2 }) },
};

// ----------------------------------------------------------------------

export const form = { MuiFormLabel, MuiFormHelperText, MuiFormControlLabel };
