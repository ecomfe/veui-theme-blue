import '../icons/chevron-double-down';
import '../icons/chevron-down';
import '../icons/arrow-down';
import 'veui-theme-blue-icons/sort';
import config from 'veui/managers/config';

config.defaults(
    {
        icons: {
            expand: 'chevron-down',
            collapse: 'chevron-down',
            expandAll: 'chevron-double-down',
            collapseAll: 'chevron-double-down',
            asc: 'arrow-up',
            desc: 'arrow-down',
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
