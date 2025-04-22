import { alpha } from '@mui/material/styles'
import { grey, info, error, common, primary, success, warning, secondary } from './palette';

// ----------------------------------------------------------------------

export function createShadowColor(color) {
  return `0 8px 16px 0 ${alpha(color, 0.24)}`;
}

export function customShadows(colorScheme) {
  const color = colorScheme === 'light' ? grey['500'] : common.common.black;

  return {
    z1: `0 1px 2px 0 ${alpha(color, 0.16)}`,
    z4: `0 4px 8px 0 ${alpha(color, 0.16)}`,
    z8: `0 8px 16px 0 ${alpha(color, 0.16)}`,
    z12: `0 12px 24px -4px ${alpha(color, 0.16)}`,
    z16: `0 16px 32px -4px ${alpha(color, 0.16)}`,
    z20: `0 20px 40px -4px ${alpha(color, 0.16)}`,
    z24: `0 24px 48px 0 ${alpha(color, 0.16)}`,
    //
    dialog: `-40px 40px 80px -8px ${alpha(common.common.black, 0.24)}`,
    card: `0 0 2px 0 ${alpha(
      color,
      0.2
    )}, 0 12px 24px -4px ${alpha(color, 0.12)}`,
    dropdown: `0 0 2px 0 ${alpha(
      color,
      0.24
    )}, -20px 20px 40px -4px ${alpha(color, 0.24)}`,
    //
    primary: createShadowColor(primary.main),
    secondary: createShadowColor(secondary.main),
    info: createShadowColor(info.main),
    success: createShadowColor(success.main),
    warning: createShadowColor(warning.main),
    error: createShadowColor(error.main),
  };
}
