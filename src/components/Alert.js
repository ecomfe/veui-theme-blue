import '../icons/check-circle';
import '../icons/exclamation-circle';
import '../icons/info-circle';
import '../icons/times-circle';
import '../icons/chevron-left';
import '../icons/chevron-right';
import '../icons/times';
import ui from 'veui/managers/ui';

ui.defaults(
    {
        icons: {
            success: 'check-circle',
            warning: 'exclamation-circle',
            info: 'info-circle',
            error: 'times-circle',
            prev: 'chevron-left',
            next: 'chevron-right',
            close: 'times'
        },
        parts: {
            prev: 'icon aux',
            next: 'icon aux',
            close: 'icon aux'
        },
        ui: {
            style: {
                values: ['normal'],
            },
            size: {
                values: ['s', 'm'],
                inherit: true,
                default: 'm'
            }
        }
    },
    'alert'
);
