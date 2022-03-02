import '../icons/times-circle';
import ui from 'veui/managers/ui';

ui.defaults(
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
            clear: 'icon aux'
        }
    },
    'input'
);
