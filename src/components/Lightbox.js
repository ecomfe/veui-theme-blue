import 'veui-theme-blue-icons/plain-left';
import 'veui-theme-blue-icons/plain-right';
import 'veui-theme-blue-icons/mark-x';
import ui from 'veui/managers/ui';

ui.defaults(
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
