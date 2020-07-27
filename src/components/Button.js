import '../icons/loading';
import config from 'veui/managers/config';

config.defaults(
    {
        icons: {
            loading: 'loading'
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
                default: 's'
            },
            shape: {
                values: ['square']
            }
        },
        parts: {
            self: ({style}) => (style === 'icon' ? 'aux' : '')
        }
    },
    'button'
);
