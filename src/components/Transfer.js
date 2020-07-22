import '../icons/check';
import '../icons/times';
import '../icons/chevron-right';
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
            selectAll: 'strong text',
            removeAll: 'strong text'
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
