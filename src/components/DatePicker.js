import 'veui-theme-blue-icons/calendar';
import 'veui-theme-blue-icons/disc-x';
import ui from 'veui/managers/ui';

ui.defaults(
    {
        icons: {
            calendar: 'calendar',
            clear: 'disc-x'
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
