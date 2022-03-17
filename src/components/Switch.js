import 'veui-theme-blue-icons/loading';
import ui from 'veui/managers/ui';

ui.defaults(
    {
        icons: {
            loading: 'loading'
        },
        ui: {
            size: {
                values: ['xs', 's', 'm'],
                inherit: true,
                default: 's'
            }
        }
    },
    'switch'
);
