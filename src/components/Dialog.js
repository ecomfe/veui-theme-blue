import '../icons/times';

import config from 'veui/managers/config';

config.defaults(
    {
        icons: {
            close: 'times'
        },
        ui: {
            size: {
                values: ['xs', 's', 'm', 'l', 'xl', 'fullscreen', 'auto'],
                default: 'm'
            }
        },
        parts: {
            ok: 'primary',
            close: 'icon'
        }
    },
    'dialog'
);
