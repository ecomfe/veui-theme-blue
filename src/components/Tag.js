import config from 'veui/managers/config';
import '../icons/times';

config.defaults(
    {
        icons: {
            remove: 'times'
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
                default: 's'
            },
            shape: {
                values: ['rect', 'ellipse', 'circle'],
                default: 'rect'
            }
        },
        parts: {
            remove: 'icon aux'
        }
    },
    'tag'
);
