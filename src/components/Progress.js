import '../icons/check';
import '../icons/times';
import '../icons/check-circle';
import '../icons/times-circle';
import config from 'veui/managers/config';

config.defaults(
    {
        icons: {
            success: 'check',
            error: 'times',
            successBar: 'check-circle',
            errorBar: 'times-circle'
        },
        ui: {
            size: {
                values: ['s', 'm'],
                default: 'm',
                data: {
                    m: {
                        radius: 54,
                        strokeWidth: 8,
                        strokeLinecap: 'round'
                    },
                    s: {
                        radius: 54,
                        strokeWidth: 4,
                        strokeLinecap: 'round'
                    }
                },
                inherit: true
            },
            fluid: {
                boolean: true
            }
        }
    },
    'progress'
);
