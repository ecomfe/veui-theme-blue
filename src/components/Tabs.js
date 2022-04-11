import 'veui-theme-blue-icons/mark-x';
import 'veui-theme-blue-icons/plain-left';
import 'veui-theme-blue-icons/plain-right';
import 'veui-theme-blue-icons/mark-plus';
import 'veui-theme-blue-icons/sign-tick';
import 'veui-theme-blue-icons/sign-exclamation';
import 'veui-theme-blue-icons/sign-info';
import ui from 'veui/managers/ui';
import i18n from 'veui/managers/i18n';


i18n.register(
    'zh-Hans',
    {
        remove: '删除{label}',
        add: ''
    },
    {
        ns: 'tabs'
    }
);
ui.defaults(
    {
        icons: {
            remove: 'mark-x',
            add: 'mark-plus',
            prev: 'plain-left',
            next: 'plain-right',
            success: 'sign-tick',
            warning: 'sign-exclamation',
            info: 'sign-info',
            error: 'sign-exclamation'
        },
        ui: {
            size: {
                values: ['s', 'm'],
                inherit: true,
                default: 's'
            },
            style: {
                values: ['normal', 'primary', 'bordered', 'bordered-dark'],
                default: 'normal'
            }
        },
        parts: {
            remove: 'icon aux',
            add: 'text',
            nav: 'icon aux'
        }
    },
    'tabs'
);
