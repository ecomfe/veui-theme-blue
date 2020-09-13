import 'veui-theme-blue-icons/fast-down';
import 'veui-theme-blue-icons/plain-down';
import 'veui-theme-blue-icons/arrow-right-down-side';
import 'veui-theme-blue-icons/arrow-left-down-side';
import 'veui-theme-blue-icons/sort';
import config from 'veui/managers/config';

config.defaults(
    {
        icons: {
            expand: 'plain-down',
            collapse: 'plain-down',
            expandAll: 'fast-down',
            collapseAll: 'fast-down',
            asc: 'arrow-right-down-side',
            desc: 'arrow-left-down-side',
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
            icon: 'icon'
        }
    },
    'table'
);
