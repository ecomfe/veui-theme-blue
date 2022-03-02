import '../icons/calendar';
import '../icons/times-circle';
import ui from 'veui/managers/ui';

ui.defaults(
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
