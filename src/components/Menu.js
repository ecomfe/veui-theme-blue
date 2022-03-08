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
                default: 'm',
                inherit: true
            }
        },
        parts: {
            toggle: 'icon'
        }
    },
    'menu'
);
