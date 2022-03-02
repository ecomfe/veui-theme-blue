import '../icons/search';
import ui from 'veui/managers/ui';


ui.defaults(
    {
        icons: {
            search: 'search'
        },
        parts: {
            button: 'primary',
            search: 'icon aux'
        },
        ui: {
            style: {
                values: ['normal', 'strong'],
                inherit: true
            },
            size: {
                values: ['xs', 's', 'm', 'l'],
                inherit: true,
                default: 's'
            }
        }
    },
    'searchbox'
);
