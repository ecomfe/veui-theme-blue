import '../icons/chevron-down';
import ui from 'veui/managers/ui';

ui.defaults(
    {
        icons: {
            expand: 'chevron-down',
            collapse: 'chevron-down'
        },
        ui: {
            size: {
                values: ['xs', 's', 'm', 'l'],
                inherit: true,
                default: 's'
            },
            style: {
                values: ['primary', 'basic', 'normal'],
                default: 'basic',
                inherit: true
            },
            shade: {
                values: ['text'],
                inherit: true
            }
        },
        parts: {
            search: 'icon'
        }
    },
    'dropdown'
);
