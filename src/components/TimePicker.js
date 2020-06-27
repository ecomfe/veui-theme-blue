import '../icons/clock';
import '../icons/times-circle';
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
