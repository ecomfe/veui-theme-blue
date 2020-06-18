import 'veui-theme-blue-icons/chevron-double-down';
import 'veui-theme-blue-icons/chevron-down';
import 'veui-theme-blue-icons/arrow-down';
import 'veui-theme-blue-icons/sort';
import config from 'veui/managers/config';

config.defaults(
    {
        icons: {
            expand: 'chevron-down',
            collapse: 'chevron-down',
            expandAll: 'chevron-double-down',
            collapseAll: 'chevron-double-down',
            asc: 'arrow-down',
            desc: 'arrow-down',
            sort: 'sort'
        },
        ui: {
            size: {
                values: ['m', 's'],
                inherit: true,
                default: 'm'
            }
        },
        parts: {
            icon: 'icon'
        }
    },
    'table'
);
