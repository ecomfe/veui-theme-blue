import '../icons/check-circle';
import '../icons/exclamation-circle';
import '../icons/info-circle';
import '../icons/times-circle';
import '../icons/chevron-left';
import '../icons/chevron-right';
import '../icons/times';
import config from 'veui/managers/config';

config.defaults(
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
            prev: 'icon',
            next: 'icon',
            close: 'icon'
        },
        ui: {
            style: {
                values: ['normal'],
            }
        }
    },
    'alert'
);
