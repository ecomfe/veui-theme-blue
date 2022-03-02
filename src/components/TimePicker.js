import '../icons/clock';
import '../icons/times-circle';
import ui from 'veui/managers/ui';

ui.defaults(
    {
        icons: {
            clock: 'clock', // check
            clear: 'times-circle', // TODO new icon
        },
        ui: {
            size: {
                values: ['s', 'm'],
                default: 's',
                inherit: true
            }
        },
        parts: {
            clear: 'icon aux'
        }
    },
    'timepicker'
);
