import '../icons/times';

import ui from 'veui/managers/ui';

ui.defaults(
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
            close: 'icon aux'
        }
    },
    'dialog'
);
