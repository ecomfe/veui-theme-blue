import 'veui-theme-blue-icons/fast-down';
import 'veui-theme-blue-icons/plain-down';
import 'veui-theme-blue-icons/sort';
import config from 'veui/managers/config';

config.defaults(
    {
        icons: {
            expand: 'plain-down',
            collapse: 'plain-down',
            expandAll: 'fast-down',
            collapseAll: 'fast-down',
            asc: 'sort',
            desc: 'sort',
            sort: 'sort'
        },
        ui: {
            size: {
                values: ['xs', 's', 'm', 'l'],
                inherit: true,
                default: 's'
            }
        },
        parts: {
            icon: 'icon aux'
        }
    },
    'table'
);
