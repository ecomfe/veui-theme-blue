import '../icons/times-circle';
import config from 'veui/managers/config';

config.defaults(
    {
        // TODO: 需要替换新icon
        icons: {
            clear: 'times-circle'
        },
        ui: {
            size: {
                values: ['xs', 's', 'm', 'l'],
                inherit: true,
                default: 's'
            }
        },
        parts: {
            clear: 'icon'
        }
    },
    'input'
);
