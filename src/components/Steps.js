import '../icons/check';
import '../icons/times';
import config from 'veui/managers/config';

config.defaults(
    {
        icons: {
            success: 'check',
            error: 'times'
        },
        ui: {
            direction: {
                values: ['vertical', 'label-vertical']
            },
            size: {
                values: ['s', 'm'],
                inherit: true
            }
        }
    },
    'steps'
);
