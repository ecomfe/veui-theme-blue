import 'veui-theme-blue-icons/sign-tick';
import 'veui-theme-blue-icons/sign-exclamation';
import 'veui-theme-blue-icons/sign-info';
import 'veui-theme-blue-icons/sign-x';
import 'veui-theme-blue-icons/plain-left';
import 'veui-theme-blue-icons/plain-right';
import 'veui-theme-blue-icons/mark-x';
import ui from 'veui/managers/ui';

ui.defaults(
    {
        icons: {
            success: 'sign-tick',
            warning: 'sign-exclamation',
            info: 'sign-info',
            error: 'sign-x',
            prev: 'plain-left',
            next: 'plain-right',
            close: 'mark-x'
        },
        parts: {
            prev: 'icon',
            next: 'icon',
            close: 'icon'
        },
        ui: {
            style: {
                values: ['normal'],
            },
            size: {
                values: ['s', 'm'],
                inherit: true,
                default: 's'
            }
        }
    },
    'alert'
);
