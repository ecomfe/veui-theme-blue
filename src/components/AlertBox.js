import 'veui-theme-blue-icons/check-circle';
import 'veui-theme-blue-icons/info-circle';
import 'veui-theme-blue-icons/exclamation-circle';
import 'veui-theme-blue-icons/times-circle';
import config from 'veui/managers/config';

config.defaults(
    {
        icons: {
            success: 'check-circle',
            info: 'info-circle',
            error: 'times-circle',
            warning: 'exclamation-circle'
        },
        parts: {
            ok: 'primary'
        }
    },
    'alertbox'
);
