import '../icons/times';

import config from 'veui/managers/config';

config.defaults(
    {
        icons: {
            close: 'times'
        },
        ui: {
            size: {
                values: ['s', 'm', 'l'],
                default: 'm'
            }
        },
        parts: {
            ok: 'primary',
            close: 'icon'
        }
    },
    'drawer'
);
