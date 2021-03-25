import 'veui-theme-blue-icons/plain-left';
import 'veui-theme-blue-icons/plain-right';
import 'veui-theme-blue-icons/mark-x';
import config from 'veui/managers/config';

config.defaults(
    {
        icons: {
            close: 'mark-x',
            prev: 'plain-left',
            next: 'plain-right'
        },
        parts: {
            close: 'icon',
            control: 'translucent'
        }
    },
    'lightbox'
);
