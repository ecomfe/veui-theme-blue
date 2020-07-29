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
                default: 's',
                data: {
                    m: {
                        radius: 50,
                        strokeWidth: 8,
                        strokeLinecap: 'round'
                    },
                    s: {
                        radius: 48,
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
