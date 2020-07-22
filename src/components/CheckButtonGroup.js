import config from 'veui/managers/config';

config.defaults(
    {
        ui: {
            size: {
                values: ['s', 'm', 'l'],
                default: 'm',
                inherit: true
            }
        },
        parts: {
            button: 'normal'
        }
    },
    'checkbuttongroup'
);
