import 'veui-theme-blue-icons/clock';
import 'veui-theme-blue-icons/times-circle';
import config from 'veui/managers/config';

config.defaults(
    {
        icons: {
            clock: 'clock',
            clear: 'times-circle'
        },
        ui: {
            size: {
                values: ['s', 'm'],
                inherit: true
            }
        },
        parts: {
            clear: 'icon'
        }
    },
    'timepicker'
);
