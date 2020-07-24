import '../icons/chevron-right';
import config from 'veui/managers/config';

config.defaults(
    {
        icons: {
            expand: 'chevron-right',
            collapse: 'chevron-right'
        },
        parts: {
            toggle: 'icon'
        }
    },
    'menu'
);
