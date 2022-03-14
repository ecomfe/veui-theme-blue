import 'veui-theme-blue-icons/sign-tick';
import 'veui-theme-blue-icons/sign-exclamation';
import 'veui-theme-blue-icons/sign-info';
import 'veui-theme-blue-icons/sign-x';
import 'veui-theme-blue-icons/mark-x';
import ui from 'veui/managers/ui';

ui.defaults(
    {
        icons: {
            success: 'sign-tick',
            warning: 'sign-exclamation',
            info: 'sign-info',
            error: 'sign-x',
            close: 'mark-x'
        },
        parts: {
            close: 'icon aux'
        }
    },
    'toast'
);
