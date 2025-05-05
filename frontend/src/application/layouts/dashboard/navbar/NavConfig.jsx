import GridViewIcon from '@mui/icons-material/GridView';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import SyncIcon from '@mui/icons-material/Sync';
import React from 'react';

import Label from './../../../../components/Label';
import SvgIconStyle from './../../../../components/SvgIconStyle';

import { PATH_DASHBOARD } from '../../../router/paths';
// ----------------------------------------------------------------------

const getIcon = (name) => (
    <SvgIconStyle
        src={`/assets/icons/navbar/${name}.svg`}
        sx={{ height: 1, width: 1 }}
    />
);

const ICONS = {
    analytics: getIcon('ic_analytics'),
    banking: getIcon('ic_banking'),
    blog: getIcon('ic_blog'),
    booking: getIcon('ic_booking'),
    calendar: getIcon('ic_calendar'),
    cart: getIcon('ic_cart'),
    chat: getIcon('ic_chat'),
    conflicts: getIcon('ic_alert'),
    dashboard: getIcon('ic_dashboard'),
    ecommerce: getIcon('ic_ecommerce'),
    invoice: getIcon('ic_invoice'),
    kanban: getIcon('ic_kanban'),
    mail: getIcon('ic_mail'),
    menuItem: getIcon('ic_menu_item'),
    user: getIcon('ic_user'),
};

const navConfig = [
    {
        items: [
            {
                icon: ICONS.dashboard,
                path: PATH_DASHBOARD.general.app,
                title: 'Dashboard',
            },
        ],
        subheader: '',
    },
    {
        items: [
            {
                icon: ICONS.kanban,
                path: PATH_DASHBOARD.projects.root,
                title: 'Мои задачи',
            },
            {
                icon: ICONS.calendar,
                path: PATH_DASHBOARD.projects.all,
                title: 'Список всех задач',
            },
            {
                icon: ICONS.booking,
                path: PATH_DASHBOARD.projects.new,
                title: 'Новая задача',
            }
        ],
        subheader: 'Задачи',
    },
    {
        items: [
            {
                children: [
                    {
                        path: PATH_DASHBOARD.user.list,
                        title: 'Список пользователей',
                    },
                    {
                        path: PATH_DASHBOARD.user.profile,
                        title: 'Мой профиль',
                    }
                ],
                icon: ICONS.user,
                path: PATH_DASHBOARD.user.profile,
                title: 'Пользватели',
            }
        ],
        subheader: 'Пользватели',
    },
];

export default navConfig;
