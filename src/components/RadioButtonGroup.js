import ui from 'veui/managers/ui';

ui.defaults(
    {
        ui: {
            size: {
                values: ['s', 'm', 'l'],
                default: 'm',
                inherit: true
            },
            style: {
                values: ['strong', 'primary'],
                default: 'primary'
            }
        },
        parts: {
            button: 'normal'
        }
    },
    'radiobuttongroup'
);
