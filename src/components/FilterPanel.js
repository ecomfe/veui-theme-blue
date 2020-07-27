import config from 'veui/managers/config';

config.defaults(
    {
        parts: {
            search: 'icon'
        },
        ui: {
            size: {
                values: ['s', 'm'],
                inherit: true
            }
        }
    },
    'filterpanel'
);
