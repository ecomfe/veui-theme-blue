import config from 'veui/managers/config';

config.defaults(
    {
        ui: {
            style: {
                values: ['black', 'white'],
                default: 'black'
            }
        }
    },
    'tooltip'
);
