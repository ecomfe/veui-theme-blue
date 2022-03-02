import ui from 'veui/managers/ui';
import '../icons/times';

ui.defaults(
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
