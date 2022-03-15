import 'veui-theme-blue-icons/disc-x';
import ui from 'veui/managers/ui';

ui.defaults(
    {
        icons: {
            clear: 'disc-x'
        },
        ui: {
            size: {
                values: ['xs', 's', 'm', 'l', 'xl'],
                inherit: true,
                default: 's'
            }
        },
        parts: {
            clear: 'icon aux'
        }
    },
    'input'
);
