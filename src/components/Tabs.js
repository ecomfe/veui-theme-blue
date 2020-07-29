import '../icons/times';
import '../icons/chevron-left';
import '../icons/chevron-right';
import '../icons/plus';
import '../icons/check-circle';
import '../icons/exclamation-circle';
import '../icons/info-circle';
import '../icons/times-circle';
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
                values: ['simple', 'strong']
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
