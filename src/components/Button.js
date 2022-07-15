import 'veui-theme-blue-icons/loading';
import ui from 'veui/managers/ui';

ui.defaults(
    {
        icons: {
            loading: null
        },
        ui: {
            style: {
                values: ['normal', 'translucent', 'primary', 'text', 'icon'],
                default: 'normal'
            },
            strength: {
                values: ['strong']
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
