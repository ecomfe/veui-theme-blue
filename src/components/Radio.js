import ui from 'veui/managers/ui';

ui.defaults(
    {
        ui: {
            size: {
                values: ['s', 'm', 'l'],
                default: 'm',
                inherit: true
            }
        }
    },
    'radio'
);
