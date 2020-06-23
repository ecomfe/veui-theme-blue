import 'veui-theme-blue-icons/check';
import 'veui-theme-blue-icons/times';
import 'veui-theme-blue-icons/chevron-right';
import config from 'veui/managers/config';

config.defaults(
    {
        icons: {
            checked: 'check',
            select: null,
            remove: 'times',
            collapse: 'chevron-right',
            expand: 'chevron-right',
            separator: 'chevron-right'
        },
        parts: {
            tree: 'checkbox-after',
            remove: 'icon',
            selectAll: 'text',
            removeAll: 'text'
        },
        ui: {
            size: {
                values: ['s', 'm'],
                inherit: true
            }
        }
    },
    'transfer'
);
