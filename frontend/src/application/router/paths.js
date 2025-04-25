// ----------------------------------------------------------------------

function path(root, sublink) {
    return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
    login: path(ROOTS_AUTH, '/login'),
    // loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
    // newPassword: path(ROOTS_AUTH, '/new-password'),
    // register: path(ROOTS_AUTH, '/register'),
    // registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
    // resetPassword: path(ROOTS_AUTH, '/reset-password'),
    // root: ROOTS_AUTH,
    // verify: path(ROOTS_AUTH, '/verify'),
};

export const PATH_PAGE = {
    // about: '/about-us',
    // comingSoon: '/coming-soon',
    // components: '/components',
    // contact: '/contact-us',
    // faqs: '/faqs',
    // maintenance: '/maintenance',
    page403: '/403',
    page404: '/404',
    page500: '/500',
    // payment: '/payment',
    // pricing: '/pricing',
};

export const PATH_DASHBOARD = {
    // blog: {
    //     demoView: path(
    //         ROOTS_DASHBOARD,
    //         '/blog/post/apply-these-7-secret-techniques-to-improve-event',
    //     ),
    //     new: path(ROOTS_DASHBOARD, '/blog/new'),
    //     posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    //     root: path(ROOTS_DASHBOARD, '/blog'),
    //     view: (title) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    // },
    // calendar: path(ROOTS_DASHBOARD, '/calendar'),
    // chat: {
    //     root: path(ROOTS_DASHBOARD, '/chat'),
    // },
    // conflicts: {
    //     root: path(ROOTS_DASHBOARD, '/conflicts'),
    // },
    // eCommerce: {
    //     checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    //     demoEdit: path(
    //         ROOTS_DASHBOARD,
    //         '/e-commerce/product/nike-blazer-low-77-vintage/edit',
    //     ),
    //     demoView: path(
    //         ROOTS_DASHBOARD,
    //         '/e-commerce/product/nike-air-force-1-ndestrukt',
    //     ),
    //     edit: (name) =>
    //         path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    //     list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    //     new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    //     notifications: path(ROOTS_DASHBOARD, '/user/notifications'),
    //     root: path(ROOTS_DASHBOARD, '/e-commerce'),
    //     shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    //     view: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    // },
    // equipment: {
    //     root: path(ROOTS_DASHBOARD, '/equipment'),
    //     view: (id) => path(ROOTS_DASHBOARD, `/equipment/${id}`),
    //     // shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    //     // list: path(ROOTS_DASHBOARD, '/equipment/list'),
    //     // checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    //     // new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    //     // view: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    //     // edit: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    //     // demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    //     // demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
    //     // notifications: path(ROOTS_DASHBOARD, '/user/notifications'),
    // },
    general: {
        // analytics: path(ROOTS_DASHBOARD, '/analytics'),
        app: path(ROOTS_DASHBOARD, '/app'),
        // banking: path(ROOTS_DASHBOARD, '/banking'),
        // booking: path(ROOTS_DASHBOARD, '/booking'),
        // ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
        // equipment: path(ROOTS_DASHBOARD, '/equipment'),
        // warehouse: path(ROOTS_DASHBOARD, '/warehouse'),
        // calendar: path(ROOTS_DASHBOARD, '/calendar'),
        // moving: path(ROOTS_DASHBOARD, '/moving'),
        // projects: path(ROOTS_DASHBOARD, '/projects'),
        // reservation: path(ROOTS_DASHBOARD, '/reservation'),
        // reservationNew: path(ROOTS_DASHBOARD, '/reservationNew'),
        // reservationNewOld: path(ROOTS_DASHBOARD, '/reservationNewOld'),
    },
    // shipments: {
    //     view: (type, id, shipmentId) => path(ROOTS_DASHBOARD, `/shipments/${type}/${id}/${shipmentId}`),
    //     create: (type, id) => path(ROOTS_DASHBOARD, `/shipments/${type}/new/${id}`),
    //     process: (type, id, shipmentId) => path(ROOTS_DASHBOARD, `/shipments/${type}/${id}/${shipmentId}/process`),
    // },
    // invoice: {
    //     // edit: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    //     demoEdit: path(
    //         ROOTS_DASHBOARD,
    //         '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit',
    //     ),
    //     demoView: path(
    //         ROOTS_DASHBOARD,
    //         '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
    //     ),
    //     list: path(ROOTS_DASHBOARD, '/invoice/list'),
    //     notifications: path(ROOTS_DASHBOARD, '/user/notifications'),
    //     root: path(ROOTS_DASHBOARD, '/invoice'),
    //     // new: path(ROOTS_DASHBOARD, '/invoice/new'),
    //     view: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    // },
    // kanban: path(ROOTS_DASHBOARD, '/kanban'),
    // mail: {
    //     all: path(ROOTS_DASHBOARD, '/mail/all'),
    //     root: path(ROOTS_DASHBOARD, '/mail'),
    // },
    // moving: {
    //     edit: (id) => path(ROOTS_DASHBOARD, `/moving/${id}/edit`),
    //     new: path(ROOTS_DASHBOARD, '/moving/new'),
    //     root: path(ROOTS_DASHBOARD, '/moving'),
    //     view: (id) => path(ROOTS_DASHBOARD, `/moving/${id}`),
    // },
    // permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
    // projects: {
    //     edit: (id) => path(ROOTS_DASHBOARD, `/projects/${id}/edit`),
    //     new: path(ROOTS_DASHBOARD, '/projects/new'),
    //     root: path(ROOTS_DASHBOARD, '/projects'),
    //     view: (id) => path(ROOTS_DASHBOARD, `/projects/${id}`),
    // },
    // repair: {
    //     root: path(ROOTS_DASHBOARD, '/repair'),
    // },
    // root: ROOTS_DASHBOARD,
    // subrent: {
    //     companies: path(ROOTS_DASHBOARD, '/subrent/companies'),
    //     incoming: (id) =>
    //         path(ROOTS_DASHBOARD, `/subrent/companies/incoming/${id}`),
    //     projects: path(ROOTS_DASHBOARD, '/subrent/projects'),
    //     root: path(ROOTS_DASHBOARD, '/subrent'),
    // },
    user: {
    //     account: path(ROOTS_DASHBOARD, '/user/account'),
    //     cards: path(ROOTS_DASHBOARD, '/user/cards'),
    //     demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    //     edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    //     list: path(ROOTS_DASHBOARD, '/user/list'),
    //     new: path(ROOTS_DASHBOARD, '/user/new'),
    //     notifications: path(ROOTS_DASHBOARD, '/user/notifications'),
        profile: path(ROOTS_DASHBOARD, '/user/profile'),
    //     profileAnother: (id) => path(ROOTS_DASHBOARD, `/user/profile/${id}`),
    //     root: path(ROOTS_DASHBOARD, '/user'),
    //     statistics: path(ROOTS_DASHBOARD, '/user/statistics'),
    },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
