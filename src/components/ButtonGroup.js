import ui from 'veui/managers/ui';

ui.defaults(
    {
        ui: {
            style: {
                values: ['normal', 'primary', 'strong'],
                default: 'normal',
                inherit: true
            },
            size: {
                values: ['xs', 's', 'm', 'l', 'xl'],
                default: 's',
                inherit: true
            }
        }
    },
    'buttongroup'
);
