import '../icons/check-circle';
import '../icons/exclamation-circle';
import '../icons/info-circle';
import '../icons/times-circle';
import '../icons/times';
import config from 'veui/managers/config';

config.defaults(
    {
        icons: {
            success: 'check-circle',
            warning: 'exclamation-circle',
            info: 'info-circle',
            error: 'times-circle',
            close: 'times'
        },
        parts: {
            close: 'icon aux'
        },
        ui: {
            size: {
                values: ['s', 'm'],
                default: 'm',
                inherit: true
            }
        }
    },
    'toast'
);
