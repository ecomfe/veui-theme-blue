import config from 'veui/managers/config';
import '../icons/times';

config.defaults(
    {
        icons: {
            close: 'times'
        },
        ui: {
            borderless: {
                boolean: true
            },
            reverse: {
                boolean: true
            },
            size: {
                values: ['xs', 's', 'm', 'l'],
                inherit: true,
                default: 'm'
            },
            shape: {
                values: ['rect', 'ellipse', 'circle']
            }
        },
        parts: {
            close: 'icon aux'
        }
    },
    'tag'
);
