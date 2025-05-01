// ----------------------------------------------------------------------

function path(root, sublink) {
    return `${root}${sublink}`;
}

const ROOTS_AUTH = '/authorization';
const ROOTS_DASHBOARD = '';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
    login: path(ROOTS_AUTH, '/login'),
    register: path(ROOTS_AUTH, '/register'),
};

export const PATH_PAGE = {
    page403: '/403',
    page404: '/404',
    page500: '/500',
};

export const PATH_DASHBOARD = {
    general: {
        app: path(ROOTS_DASHBOARD, '/app'),
    },
    user: {
        list: path(ROOTS_DASHBOARD, '/user/list'),
        profile: path(ROOTS_DASHBOARD, '/user/profile'),
        profileAnother: (id) => path(ROOTS_DASHBOARD, `/user/profile/${id}`),
    },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
