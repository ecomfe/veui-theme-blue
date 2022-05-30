import '../icons/check';
import ui from 'veui/managers/ui';

ui.defaults(
    {
        ui: {
            size: {
                values: ['s', 'm', 'l'],
                default: 's',
                inherit: true
            },
            style: {
                values: ['primary', 'strong'],
                default: 'primary'
            },
        },
        parts: {
            button: 'normal'
        },
        icons: {
            check: 'check'
        }
    },
    'checkbuttongroup'
);
