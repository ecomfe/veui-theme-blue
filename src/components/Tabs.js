import '../icons/times';
import '../icons/chevron-left';
import '../icons/chevron-right';
import 'veui-theme-blue-icons/mark-plus';
import '../icons/check-circle';
import '../icons/exclamation-circle';
import '../icons/info-circle';
import '../icons/times-circle';
import config from 'veui/managers/config';
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
config.defaults(
    {
        icons: {
            remove: 'times',
            add: 'mark-plus',
            prev: 'chevron-left',
            next: 'chevron-right',
            success: 'check-circle',
            warning: 'exclamation-circle',
            info: 'info-circle',
            error: 'times-circle'
        },
        ui: {
            size: {
                values: ['s', 'm'],
                inherit: true
            },
            style: {
                values: ['normal', 'primary', 'bordered'],
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
