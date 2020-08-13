import 'veui-theme-blue-icons/plain-right';
import 'veui-theme-blue-icons/more-ellipsis';
import config from 'veui/managers/config';

config.defaults(
    {
        icons: {
            expand: 'plain-right',
            more: 'more-ellipsis'
        },
        ui: {
            size: {
                values: ['s', 'm', 'l'],
                inherit: true,
                default: 'm'
            }
        },
        parts: {
            toggle: 'icon aux'
        }
    },
    'nav'
);

