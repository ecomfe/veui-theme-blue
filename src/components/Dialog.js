import 'veui-theme-blue-icons/mark-x';
import ui from 'veui/managers/ui';

ui.defaults(
    {
        icons: {
            close: 'mark-x'
        },
        ui: {
            size: {
                values: ['xs', 's', 'm', 'l', 'xl', 'fullscreen', 'auto'],
                default: 'm'
            }
        },
        parts: {
            ok: 'primary',
            close: 'icon aux'
        }
    },
    'dialog'
);
