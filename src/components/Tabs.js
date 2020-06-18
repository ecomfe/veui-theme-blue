import 'veui-theme-blue-icons/times';
import 'veui-theme-blue-icons/chevron-left';
import 'veui-theme-blue-icons/chevron-right';
import 'veui-theme-blue-icons/plus';
import 'veui-theme-blue-icons/check-circle';
import 'veui-theme-blue-icons/exclamation-circle';
import 'veui-theme-blue-icons/info-circle';
import 'veui-theme-blue-icons/times-circle';
import config from 'veui/managers/config';

config.defaults(
    {
        icons: {
            remove: 'times',
            add: 'plus',
            prev: 'chevron-left',
            next: 'chevron-right',
            success: 'check-circle',
            warning: 'exclamation-circle',
            info: 'info-circle',
            error: 'times-circle'
        },
        ui: {
            size: {
                values: ['s', 'm', 'l'],
                default: 'm',
                inherit: true
            },
            style: {
                values: ['block']
            }
        },
        parts: {
            remove: 'icon',
            add: 'text',
            nav: 'icon'
        }
    },
    'tabs'
);
