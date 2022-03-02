import ui from 'veui/managers/ui';

ui.defaults(
    {
        ui: {
            size: {
                values: ['xs', 's', 'm', 'l'],
                default: 's',
                inherit: true
            }
        }
    },
    'inputgroup'
);
