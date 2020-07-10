import '../icons/loading';
import config from 'veui/managers/config';

config.defaults(
    {
        icons: {
            loading: 'loading'
        },
        ui: {
            shape: {
                values: ['text', 'icon', 'square']
            },
            style: {
                values: ['normal', 'translucent', 'primary', 'strong']
            },
            size: {
                values: ['xs', 's', 'm', 'l', 'xl'],
                default: 'm'
            }
        }
    },
    'button'
);
