import { arSD, enUS, frFR, viVN, zhCN } from '@mui/material/locale';

// API
// ----------------------------------------------------------------------

export const API_URL = window.env.API_URL || '';
// export const API_URL = window.env.local.API_URL_AUTH || 'http://localhost:5000';
// export const API_URL = window.env.local.API_URL_TASK || 'http://localhost:5001';

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = '/app';

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
    DASHBOARD_DESKTOP_HEIGHT: 82,
    DASHBOARD_DESKTOP_OFFSET_HEIGHT: 82 - 32,
    MAIN_DESKTOP_HEIGHT: 78,
    MOBILE_HEIGHT: 54,
};

export const NAVBAR = {
    BASE_WIDTH: 260,
    DASHBOARD_COLLAPSE_WIDTH: 88,
    DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
    //
    DASHBOARD_ITEM_ROOT_HEIGHT: 48,
    DASHBOARD_ITEM_SUB_HEIGHT: 40,
    DASHBOARD_WIDTH: 280,
};

export const ICON = {
    NAVBAR_ITEM: 22,
    NAVBAR_ITEM_HORIZONTAL: 20,
};

// SETTINGS
// Please remove `localStorage` when you change settings.
// ----------------------------------------------------------------------

export const defaultSettings = {
    themeColorPresets: 'default',
    themeContrast: 'default',
    themeDirection: 'ltr',
    themeLayout: 'horizontal',
    themeMode: 'dark',
    themeStretch: true,
};

// MULTI LANGUAGES
// Please remove `localStorage` when you change settings.
// ----------------------------------------------------------------------

export const allLangs = [
    {
        icon: '/assets/icons/flags/ic_flag_en.svg',
        label: 'English',
        systemValue: enUS,
        value: 'en',
    },
    {
        icon: '/assets/icons/flags/ic_flag_fr.svg',
        label: 'French',
        systemValue: frFR,
        value: 'fr',
    },
    {
        icon: '/assets/icons/flags/ic_flag_vn.svg',
        label: 'Vietnamese',
        systemValue: viVN,
        value: 'vn',
    },
    {
        icon: '/assets/icons/flags/ic_flag_cn.svg',
        label: 'Chinese',
        systemValue: zhCN,
        value: 'cn',
    },
    {
        icon: '/assets/icons/flags/ic_flag_sa.svg',
        label: 'Arabic (Sudan)',
        systemValue: arSD,
        value: 'ar',
    },
];

export const defaultLang = allLangs[0]; // English
