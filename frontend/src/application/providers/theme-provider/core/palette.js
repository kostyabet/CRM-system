import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

function createGradient(color1, color2) {
    return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
export const primary = {
    dark: '#007B55',
    darker: '#005249',
    light: '#5BE584',
    lighter: '#C8FACD',
    main: '#00AB55',
};
export const secondary = {
    dark: '#1939B7',
    darker: '#091A7A',
    light: '#84A9FF',
    lighter: '#D6E4FF',
    main: '#3366FF',
};
export const info = {
    dark: '#0C53B7',
    darker: '#04297A',
    light: '#74CAFF',
    lighter: '#D0F2FF',
    main: '#1890FF',
};
export const success = {
    dark: '#229A16',
    darker: '#08660D',
    light: '#AAF27F',
    lighter: '#E9FCD4',
    main: '#54D62C',
};
export const warning = {
    dark: '#B78103',
    darker: '#7A4F01',
    light: '#FFE16A',
    lighter: '#FFF7CD',
    main: '#FFC107',
};
export const error = {
    dark: '#B72136',
    darker: '#7A0C2E',
    light: '#FFA48D',
    lighter: '#FFE7D9',
    main: '#FF4842',
};

export const grey = {
    0: '#FFFFFF',
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#212B36',
    900: '#161C24',
    500_8: alpha('#919EAB', 0.08),
    500_12: alpha('#919EAB', 0.12),
    500_16: alpha('#919EAB', 0.16),
    500_24: alpha('#919EAB', 0.24),
    500_32: alpha('#919EAB', 0.32),
    500_48: alpha('#919EAB', 0.48),
    500_56: alpha('#919EAB', 0.56),
    500_80: alpha('#919EAB', 0.8),
};


const CHART_COLORS = {
    blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
    green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
    red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
    violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
    yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
};

export const common = {
    action: {
        disabled: grey[500_80],
        disabledBackground: grey[500_24],
        disabledOpacity: 0.48,
        focus: grey[500_24],
        hover: grey[500_8],
        hoverOpacity: 0.08,
        selected: grey[500_16],
    },
    chart: CHART_COLORS,
    common: { black: '#000', white: '#fff' },
    divider: grey[500_24],
    error: { ...error, contrastText: '#fff' },
    grey: grey,
    info: { ...info, contrastText: '#fff' },
    primary: { ...primary, contrastText: '#fff' },
    secondary: { ...secondary, contrastText: '#fff' },
    success: { ...success, contrastText: grey[800] },
    warning: { ...warning, contrastText: grey[800] },
};

const lightPalette = {
  ...common,
  action: { active: grey[600], ...common.action },
  background: { default: '#fff', neutral: grey[200], paper: '#fff' },
  mode: 'light',
  tableData: {
      inStock: '#d7ffd9',
      inTransport: '#ffc4ff',
      inWork: '#d1d9ff',
      isInWorkQuest: 'linear-gradient(135deg, #d1d9ff 50%, #fff59d 50%)',
      lackRecover: '#ffffcf',
      lackUnrecover: '#ffcccb',
      transportIn: '#c7c8ff',
      transportInOut: 'linear-gradient(115deg, #c7c8ff 25%, #ffebb2 75%)',
      transportOut: '#ffebb2',
  },
  text: { disabled: grey[500], primary: grey[800], secondary: grey[600] },
}

const darkPalette = {
  ...common,
  action: { active: grey[500], ...common.action },
  background: {
      default: grey[900],
      neutral: grey[500_16],
      paper: grey[800],
  },
  mode: 'dark',
  tableData: {
      inStock: '#087f23',
      inTransport: '#9c4dcc',
      inWork: '#666ad1',
      isInWorkQuest: 'linear-gradient(135deg, #666ad1 50%, #c17900 50%)',
      lackRecover: '#ffffcf',
      lackUnrecover: '#ff6659',
      transportIn: '#0040ff',
      transportInOut: 'linear-gradient(115deg, #0040ff 25%, #ff6d00 75%)',
      transportOut: '#ff6d00',
  },
  text: { disabled: grey[600], primary: '#fff', secondary: grey[500] },
}

export const colorSchemes = {
  light: { palette: lightPalette },
  dark: { palette: darkPalette },
}

const palette = {
    dark: darkPalette,
    light: lightPalette
};

export default palette;