import 'veui-theme-blue-icons/search';
import ui from 'veui/managers/ui';


ui.defaults(
    {
        icons: {
            search: 'search'
        },
        parts: {
            button: 'primary',
            search: 'icon'
        },
        ui: {
            style: {
                values: ['normal', 'strong', 'inline'],
                inherit: true
            },
            size: {
                values: ['xs', 's', 'm', 'l', 'xl'],
                inherit: true,
                default: 's'
            }
        }
    },
    'searchbox'
);
