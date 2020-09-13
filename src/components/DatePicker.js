import '../icons/calendar';
import '../icons/times-circle';
import config from 'veui/managers/config';

config.defaults(
    {
        icons: {
            calendar: 'calendar',
            clear: 'times-circle'
        },
        ui: {
            size: {
                values: ['s', 'm'],
                inherit: true
            }
        },
        parts: {
            clear: 'icon aux',
            input: 'inline'
        }
    },
    'datepicker'
);
