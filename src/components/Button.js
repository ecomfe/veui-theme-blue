import '../icons/loading';
import config from 'veui/managers/config';

config.defaults(
    {
        icons: {
            // loading: 'loading',
            loading: null
        },
        ui: {
            style: {
                values: ['normal', 'translucent', 'primary', 'text', 'icon'],
                default: 'normal'
            },
            strength: {
                values: ['strong', 'aux']
            },
            size: {
                values: ['xs', 's', 'm', 'l', 'xl'],
                inherit: true,
                default: 's'
            },
            shape: {
                values: ['square']
            }
        }
    },
    'button'
);
