import 'veui-theme-blue-icons/plain-down';
import 'veui-theme-blue-icons/more-ellipsis';
import ui from 'veui/managers/ui';

ui.defaults(
    {
        icons: {
            expand: 'plain-down',
            more: 'more-ellipsis'
        },
        ui: {
            size: {
                values: ['s', 'm'],
                default: 's'
            }
        },
        parts: {
            toggle: 'icon aux'
        }
    },
    'nav'
);

