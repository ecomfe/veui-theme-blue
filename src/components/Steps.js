import '../icons/check';
import '../icons/times';
import ui from 'veui/managers/ui';

ui.defaults(
    {
        icons: {
            success: 'check',
            error: 'times'
        },
        ui: {
            direction: {
                values: ['vertical', 'horizon'],
                defaule: 'horizon'
            },
            size: {
                values: ['s', 'm'],
                inherit: true
            },
            style: {
                values: ['simple', 'normal', 'line', 'icon'],
                defaule: 'normal'
            }
        }
    },
    'steps'
);
