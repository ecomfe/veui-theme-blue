import 'veui-theme-blue-icons/plain-right';
import ui from 'veui/managers/ui';

ui.defaults(
    {
        icons: {
            expand: 'plain-right',
            collapse: 'plain-right'
        },
        ui: {
            size: {
                values: ['s', 'm', 'l'],
                inherit: true,
                default: 'm'
            }
        },
        parts: {
            toggle: 'icon'
        }
    },
    'sidenav'
);
