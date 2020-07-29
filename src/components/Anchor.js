import config from 'veui/managers/config';

config.defaults(
    {
        ui: {
            size: {
                values: ['s', 'm'],
                default: 's',
                inherit: true
            }
        },
        parts: {
            current: 'strong'
        }
    },
    'anchor'
);
