import '../icons/chevron-right';
import ui from 'veui/managers/ui';

ui.defaults(
    {
        icons: {
            expand: 'chevron-right',
            collapse: 'chevron-right'
        },
        ui: {
            size: {
                default: 'm',
                inherit: true
            }
        },
        parts: {
            toggle: 'icon aux'
        }
    },
    'menu'
);
