import '../icons/chevron-right';
import config from 'veui/managers/config';

config.defaults(
    {
        ui: {
            size: {
                values: ['s', 'm'],
                inherit: true,
                default: 's'
            }
        },
        icons: {
            collapse: 'chevron-right',
            expand: 'chevron-right'
        }
    },
    'collapse'
);
