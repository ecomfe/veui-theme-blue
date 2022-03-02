import '../icons/times';

import ui from 'veui/managers/ui';

ui.defaults(
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
