import '../icons/chevron-right';
import config from 'veui/managers/config';

config.defaults(
    {
        icons: {
            expand: 'chevron-right',
            collapse: 'chevron-right'
        },
        ui: {
            size: {
                default: 'm',
                inherit: true
            }
        },
        parts: {
            toggle: 'icon aux'
        }
    },
    'menu'
);
