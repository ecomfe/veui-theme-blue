import 'veui-theme-blue-icons/plain-down';
import 'veui-theme-blue-icons/more-ellipsis';
import config from 'veui/managers/config';

config.defaults(
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

