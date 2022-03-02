import '../icons/check-circle';
import '../icons/info-circle';
import '../icons/exclamation-circle';
import '../icons/times-circle';
import ui from 'veui/managers/ui';

ui.defaults(
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
