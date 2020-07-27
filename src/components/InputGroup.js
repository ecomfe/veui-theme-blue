import config from 'veui/managers/config';

config.defaults(
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
